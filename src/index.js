'use strict';

import {SerialPort} from 'serialport';

export default class SpectroPhotometer {
    constructor(port) {
        this._messages = [];
        this._currentMessage = '';
        this._resolvers = [];
        this._open = new Promise((resolve, reject) => {
            this._sp = new SerialPort(port, {
                baudrate: 115200
            }, err => {
                if (err)
                    return reject(err);
                this._sp.on('data', data => {
                    data = data.toString('ascii').split('\r\n\r\n');
                    this._currentMessage += data[0];
                    for (let i = 1; i < data.length; i++) {
                        this._messages.push(this._currentMessage);
                        this._currentMessage = data[i];
                    }
                    this._resolveData();
                });
                resolve();
            });
        });
    }
    _resolveData() {
        while (this._messages.length) {
            let message = this._messages.shift();
            this._resolvers.shift()(message);
        }
    }

    send(command) {
        return this._open.then(() => {
            return new Promise((resolve) => {
                this._resolvers.push(resolve);
                this._sp.write(command + '\r\n');
            });
        });
    }
    getHelp() {
        return this._send('h');
    }

}
