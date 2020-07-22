# ArDrone 1.0 / 2.0 firmware batch downloader

Since the Parrot website's support page is down for the ArDrone 1.0 / 2.0 amazing toys, I made this tool to extract all firmware as `plf` files, from any version to any version.

Thereby, I'm now able to test different versions, and chose the one that offers the greater flight stability.

## Install

```bash
git clone https://github.com/rascafr/ardrone-batch-firmware-downloader.git
cd ardrone-batch-firmware-downloader
npm i
```

## Configuration

Edit the `config.js` file as you wish:

```js
module.exports = {

    // ar drone 1.0 or 2.0?
    ardroneVersion: 2,

    // from 1.x.x to 3.x.x
    majorFrom: 1,
    majorTo: 3,

    // from x.0.x to x.10.x
    minorFrom: 0,
    minorTo: 10,

    // from x.x.0 to x.x.20
    patchFrom: 0,
    patchTo: 20,

    // repository url function generator to use
    repository: (x, y, z) => `http://.../ardronefirmware/${x}.${y}.${z}/ardrone${module.exports.ardroneVersion}_update.plf`
}
```

### Run it!

```bash
npm start
```

Download progress will be shown as `plf` files are found, and if yes, downloaded onto your laptop in the `ardrone-batch-firmware-downloader` directory.