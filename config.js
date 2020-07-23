module.exports = {

    // where to save the firmware files
    outPath: `${process.cwd()}/FIRMWARE_FILES`,
    
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
    repository: (x, y, z) => `http://www.digitalsirup.com/downloads/ardronefirmware/${x}.${y}.${z}/ardrone${module.exports.ardroneVersion}_update.plf`
}
