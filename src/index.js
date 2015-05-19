'use strict';

import {SerialPort, parsers} from 'serialport';

export default class SpectroPhotometer {

    constructor(port) {
        this._resolvers = [];
        this._open = new Promise((resolve, reject) => {
            this._sp = new SerialPort(port, {
                baudrate: 115200,
                parser: parsers.readline('\r\n\r\n', 'ascii')
            }, err => {
                if (err)
                    return reject(err);
                this._sp.on('data', data => {
                    var resolver = this._resolvers.shift();
                    if (resolver) {
                        resolver(data);
                    }
                });
                resolve();
            });
        });
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
        return this.send('h');
    }
    run() {
        return this.send('r');
    }
    test() {
        return this.send('t');
    }

}
