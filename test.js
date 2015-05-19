function log(m) {
    console.log(m);
}

//var SP = require('cheminfo-spectrophotometer');
var SP = require('.');

var sp = new SP('/dev/ttyACM0');
sp._open.catch(function(e){console.log(e)});

sp.send('s').then(log);
sp.getHelp().then(log);
sp.run().then(log);
sp.test().then(log);
