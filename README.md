# node-spectrophotometer

Control your spectrophotometer with JavaScript

## API

```js
var Spectro = require('cheminfo-spectrophotometer');
var spectro = new Spectro('/dev/tty-usbserial1');
spectro.run().then(function (result) {
    console.log(result);
});
```

### spectro.run()

Run an experiment

### spectro.test()

Run a test measurement

### spectro.getHelp()

### spectro.send(command)

Send any command to the device

## Licence

  [MIT](./LICENSE)
