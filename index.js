const fetch = require('node-fetch');
const clc = require('cli-color');
const rimraf = require('rimraf');
const ok = clc.greenBright;
const config = require('./config');
const { repository, ardroneVersion } = config;

console.log(`ArDrone ${ardroneVersion}.0 batch firmware downloader started!`);

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

console.log('Will try to fetch firmware from', urls.length, 'different endpoints.\nRunning now...');

Promise.all(urls.map(url => new Promise((resolve, reject) => {
        fetch(url.url).then(res => {
            status = res.status; 
            if (status === 200) console.log(ok('✓'), url.version, '(', status, ')');
            //return res.json()
            resolve(status);
        }).catch(e => {
            resolve(0);
        })
    })
)).then(() => {
    console.log('DONE!');
}).catch((e) => {})