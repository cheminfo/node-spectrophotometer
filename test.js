function log(m) {
    console.log(m);
}

var SP = require('.');

var sp = new SP('/dev/ttyACM0');
sp._open.catch(function(e){console.log(e)});

sp._send('t').then(log);
sp.getHelp().then(log);
