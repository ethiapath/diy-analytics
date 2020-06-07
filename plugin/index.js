var fs  = require("fs");

module.exports = {
  async onPreBuild({ utils }) {
    // anybody knows a better way to incorporate a NPM module's resource file
    // into the netlify workspace? please let me know!
    fs.writeFileSync('counter.js', 'const https = require("https");');
    fs.appendFileSync('counter.js', '');
    fs.appendFileSync('counter.js', 'const ANALYTICS_URL = process.env.ANALYTICS_URL;');
    fs.appendFileSync('counter.js', '');
    fs.appendFileSync('counter.js', 'exports.handler = async ({ headers }) => {');
    fs.appendFileSync('counter.js', '  if (ANALYTICS_URL) {');
    fs.appendFileSync('counter.js', '    // referer is the page the request came from');
    fs.appendFileSync('counter.js', '    // e.g. https://oliverjam.es/blog/');
    fs.appendFileSync('counter.js', '    const referer = headers.referer;');
    fs.appendFileSync('counter.js', '    const ua = headers["user-agent"];');
    fs.appendFileSync('counter.js', '    // pathname is the bit after the domain');
    fs.appendFileSync('counter.js', '    // e.g. /blog/');
    fs.appendFileSync('counter.js', '    const { pathname } = new URL(referer);');
    fs.appendFileSync('counter.js', '');
    fs.appendFileSync('counter.js', '    try {');
    fs.appendFileSync('counter.js', '      // push a new record for this url & UA');
    fs.appendFileSync('counter.js', '      const body = JSON.stringify({ url: pathname, ua });');
    fs.appendFileSync('counter.js', '      await fetch(ANALYTICS_URL, { method: "POST", body });');
    fs.appendFileSync('counter.js', '    } catch (error) {');
    fs.appendFileSync('counter.js', '      console.log(error);');
    fs.appendFileSync('counter.js', '    }');
    fs.appendFileSync('counter.js', '  }');
    fs.appendFileSync('counter.js', '');
    fs.appendFileSync('counter.js', '  // returns a transparent gif');
    fs.appendFileSync('counter.js', '  return {');
    fs.appendFileSync('counter.js', '    statusCode: 200,');
    fs.appendFileSync('counter.js', '    body: "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",');
    fs.appendFileSync('counter.js', '    headers: { "content-type": "image/gif" },');
    fs.appendFileSync('counter.js', '    isBase64Encoded: true,');
    fs.appendFileSync('counter.js', '  };');
    fs.appendFileSync('counter.js', '};');
    fs.appendFileSync('counter.js', '');
    fs.appendFileSync('counter.js', '// never write your own node-fetch');
    fs.appendFileSync('counter.js', 'function fetch(url, options = { method: "GET" }) {');
    fs.appendFileSync('counter.js', '  return new Promise((resolve, reject) => {');
    fs.appendFileSync('counter.js', '    const headers =');
    fs.appendFileSync('counter.js', '      options.method !== "GET"');
    fs.appendFileSync('counter.js', '        ? {');
    fs.appendFileSync('counter.js', '            "content-type": "application/json",');
    fs.appendFileSync('counter.js', '            "content-length": Buffer.byteLength(options.body),');
    fs.appendFileSync('counter.js', '          }');
    fs.appendFileSync('counter.js', '        : {};');
    fs.appendFileSync('counter.js', '    const req = https.request(url, { ...options, headers }, response => {');
    fs.appendFileSync('counter.js', '      let data = "";');
    fs.appendFileSync('counter.js', '      response.on("data", chunk => {');
    fs.appendFileSync('counter.js', '        data += chunk;');
    fs.appendFileSync('counter.js', '      });');
    fs.appendFileSync('counter.js', '      response.on("end", () => {');
    fs.appendFileSync('counter.js', '        const { statusCode } = response;');
    fs.appendFileSync('counter.js', '        if (statusCode >= 400) {');
    fs.appendFileSync('counter.js', '          reject(new HttpError(statusCode, data));');
    fs.appendFileSync('counter.js', '        } else {');
    fs.appendFileSync('counter.js', '          const body = JSON.parse(data);');
    fs.appendFileSync('counter.js', '          resolve(body);');
    fs.appendFileSync('counter.js', '        }');
    fs.appendFileSync('counter.js', '      });');
    fs.appendFileSync('counter.js', '    });');
    fs.appendFileSync('counter.js', '    req.on("error", reject);');
    fs.appendFileSync('counter.js', '    if (options.body) {');
    fs.appendFileSync('counter.js', '      req.write(options.body);');
    fs.appendFileSync('counter.js', '    }');
    fs.appendFileSync('counter.js', '    req.end();');
    fs.appendFileSync('counter.js', '  });');
    fs.appendFileSync('counter.js', '}');
    fs.appendFileSync('counter.js', '');
    fs.appendFileSync('counter.js', 'class HttpError extends Error {');
    fs.appendFileSync('counter.js', '  constructor(statusCode, msg) {');
    fs.appendFileSync('counter.js', '    super(msg);');
    fs.appendFileSync('counter.js', '    this.statusCode = statusCode;');
    fs.appendFileSync('counter.js', '  }');
    fs.appendFileSync('counter.js', '}');

    await utils.functions.add('./counter.js')
  },
}
