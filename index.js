const fetch = require('node-fetch');
const clc = require('cli-color');
const fs = require('fs');
const rimraf = require('rimraf');
const ok = clc.greenBright;
const emph = clc.blueBright;
const config = require('./config');
const { repository, ardroneVersion, outPath } = config;

console.log(emph(`ArDrone ${ardroneVersion}.0 batch firmware downloader started!`));

// prepare all urls
const urls = [];

for (let ma=config.majorFrom;ma<=config.majorTo;ma++) {
    for (let mi=config.minorFrom;mi<=config.minorTo;mi++) {
        for (let pa=config.patchFrom;pa<=config.patchTo;pa++) {
            urls.push({
                version: `${ma}.${mi}.${pa}`,
                url: repository(ma, mi, pa)
            })
        }
    }
}

console.log('Will try to fetch firmware from', emph(urls.length), 'different endpoints');

// clean previous directory if any
rimraf(outPath, () => {
    console.log('Cleaned output directory', emph(outPath));

    // create out directory
    fs.mkdirSync(outPath);
    
    console.log('Running now...');

    Promise.all(urls.map(url => new Promise((resolve, reject) => {
            fetch(url.url).then(res => {
                status = res.status; 
                if (status === 200) {
                    console.log(ok('✓'), 'Found firmware for', url.version, emph('( HTTP', status, ')'), ', downloading...');
                    const fwPath = `${outPath}/${url.version}-ardrone${ardroneVersion}_update.plf`;
                    saveFile(res, fwPath).then(() => {
                        console.log(ok('✓'), url.version, 'firmware downloaded!');
                        resolve(true)
                    }).catch((err) => reject(err));
                } else {
                    resolve(false);
                }
            }).catch((err) => {
                reject(err);
            });
        })
    )).then((dlRes) => {
        console.log('Finished,', emph(dlRes.filter(res => res === true).length), 'valid firmwares files saved to', emph(outPath));
        process.exit(0);
    }).catch((e) => { console.error(e); });
});

function saveFile(response, path) {
    return new Promise((resolve, reject) => {
        const dest = fs.createWriteStream(path);
        response.body.pipe(dest);
        response.body.on('error', reject);
        dest.on('finish', resolve);
    });
}