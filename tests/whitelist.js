const dotenv = require('dotenv');
const { curly } = require('node-libcurl');

// Load environment variables from .env file
dotenv.config();

const getIp = async (ip) => {
    const options = {
        ipaddress: ip,
        whitelist: ['AU', 'CA', 'CN', 'IN', 'IT', 'SG', 'AE', 'UK', 'US']
    };

    const base = `localhost:${process.env.PORT}`;
    const query = Object.keys(options)
        .map((key) => key + '=' + options[key])
        .join('&');
    const body = `${base}?${query}`;

    const res = await curly(body);

    if (res.statusCode !== 200) {
        throw new Error(res.body);
    }

    return { ...res, ip };
}

const allowTests = [ getIp("73.39.162.189"), getIp("50.218.57.65") ];
const denyTests = [ getIp("91.249.134.148"), getIp("117.54.114.98") ];

Promise.all(allowTests).then((results) => {
    console.log("Testing allowed IP addresses.");

    results.forEach((result) => {
        if (result.data === "allowed") {
            console.log(`${result.ip} is allowed. Test passed.`);
        } else {
            console.log(`${result.ip} is not allowed. Test failed.`);
        }
    });
}).catch((err) => {
    console.log(err);
});

Promise.all(denyTests).then((results) => {
    console.log("Testing blocked IP addresses.");

    results.forEach((result) => {
        if (result.data === "denied") {
            console.log(`${result.ip} is blocked. Test passed.`);
        } else {
            console.log(`${result.ip} is not blocked. Test failed.`);
        }
    });
}
).catch((err) => {
    console.log(err);
});