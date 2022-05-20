const counter = require('./counter.js');
require('dotenv').config();

const test = async function() {

    const res = await counter.handler({
        headers: {
            referer: `test-refer${Date.now()}`,
            "user-agent": `test-ua${Date.now()}`
        }
    });
    console.log(res)
}

test().then(res => {
    console.log(res)
}).catch(console.log)
