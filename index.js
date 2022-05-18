const express = require('express');
const dotenv = require('dotenv');
const { curly } = require('node-libcurl');
const fs = require('fs');
const tar = require('tar');
const Reader = require('@maxmind/geoip2-node').Reader;
const logger = require('./logger');

const logFile = fs.createWriteStream('./logs/http.log', { flags: 'a' });
const pino = require('pino-http')({}, logFile);

const app = express();

app.use(pino);

// Load environment variables from .env file
dotenv.config();

const dbName = 'GeoLite2-Country';

const extractArchive = async (output) => {
    const archive = await tar.x({
        file: output,
        C: './',
    });

    return archive;
};

const getDatabase = async () => {
    const options = {
        edition_id: 'GeoLite2-Country',
        license_key: process.env.KEY,
        suffix: 'tar.gz',
    };

    const base = 'https://download.maxmind.com/app/geoip_download';
    const query = Object.keys(options)
        .map((key) => key + '=' + options[key])
        .join('&');
    const body = `${base}?${query}`;
    const output = `${dbName}.tar.gz`;

    const { data } = await curly(body);

    // save data to file output
    fs.writeFileSync(output, data);

    // untar file
    extractArchive(output).then(() => {
        const today = new Date();
        const date =
            today.getFullYear() +
            '' +
            (today.getMonth() + 1).toString().padStart(2, '0') +
            '' +
            today.getDate().toString().padStart(2, '0');

        // move file to root directory
        fs.renameSync(`./${dbName}_${date}/${dbName}.mmdb`, `./${dbName}.mmdb`);

        // delete tar file
        fs.unlinkSync(output);

        // delete directory
        fs.rm(`./${dbName}_${date}`, { recursive: true }, (err) => {
            if (err) {
                logger.error(err);
            }
        });
    });
};

const exists = fs.existsSync(`./${dbName}.mmdb`);
if (!exists) {
    getDatabase();
} else {
    logger.info('Database already exists');
}

app.get('/', (req, res) => {
    req.log.info('something');

    const file = `${dbName}.mmdb`;

    const dbBuffer = fs.readFileSync(file);
    const reader = Reader.openBuffer(dbBuffer);
    let answer = undefined;

    try {
        answer = reader.country(req.query.ipaddress);
    } catch (e) {
        logger.error(e);
    }

    const ipexist = req.query.whitelist.includes(answer.country.isoCode);

    const outcome = ipexist ? 'allowed' : 'denied';

    res.send(outcome);
});

app.listen(process.env.PORT, () => {
    logger.info(`Server started at ${process.env.PORT}`);
});
