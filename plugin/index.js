var fs  = require("fs");

module.exports = {
  async onPreBuild({ utils }) {
    // anybody knows a better way to incorporate a NPM module's resource file
    // into the netlify workspace? please let me know!
    fs.writeFileSync('counter.js', 'const https = require("https");\n');
    fs.appendFileSync('counter.js', '\n');
    fs.appendFileSync('counter.js', 'const ANALYTICS_URL = process.env.ANALYTICS_URL;\n');
    fs.appendFileSync('counter.js', '\n');
    fs.appendFileSync('counter.js', 'exports.handler = async ({ headers }) => {\n');
    fs.appendFileSync('counter.js', '  if (ANALYTICS_URL) {\n');
    fs.appendFileSync('counter.js', '    // referer is the page the request came from\n');
    fs.appendFileSync('counter.js', '    // e.g. https://oliverjam.es/blog/\n');
    fs.appendFileSync('counter.js', '    const referer = headers.referer;\n');
    fs.appendFileSync('counter.js', '    const ua = headers["user-agent"];\n');
    fs.appendFileSync('counter.js', '    // pathname is the bit after the domain\n');
    fs.appendFileSync('counter.js', '    // e.g. /blog/\n');
    fs.appendFileSync('counter.js', '    const { pathname } = new URL(referer);\n');
    fs.appendFileSync('counter.js', '\n');
    fs.appendFileSync('counter.js', '    try {\n');
    fs.appendFileSync('counter.js', '      // push a new record for this url & UA\n');
    fs.appendFileSync('counter.js', '      const body = JSON.stringify({ url: pathname, ua });\n');
    fs.appendFileSync('counter.js', '      await fetch(ANALYTICS_URL, { method: "POST", body });\n');
    fs.appendFileSync('counter.js', '    } catch (error) {\n');
    fs.appendFileSync('counter.js', '      console.log(error);\n');
    fs.appendFileSync('counter.js', '    }\n');
    fs.appendFileSync('counter.js', '  }\n');
    fs.appendFileSync('counter.js', '\n');
    fs.appendFileSync('counter.js', '  // returns a transparent gif\n');
    fs.appendFileSync('counter.js', '  return {\n');
    fs.appendFileSync('counter.js', '    statusCode: 200,\n');
    fs.appendFileSync('counter.js', '    body: "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",\n');
    fs.appendFileSync('counter.js', '    headers: { "content-type": "image/gif" },\n');
    fs.appendFileSync('counter.js', '    isBase64Encoded: true,\n');
    fs.appendFileSync('counter.js', '  };\n');
    fs.appendFileSync('counter.js', '};\n');
    fs.appendFileSync('counter.js', '\n');
    fs.appendFileSync('counter.js', '// never write your own node-fetch\n');
    fs.appendFileSync('counter.js', 'function fetch(url, options = { method: "GET" }) {\n');
    fs.appendFileSync('counter.js', '  return new Promise((resolve, reject) => {\n');
    fs.appendFileSync('counter.js', '    const headers =\n');
    fs.appendFileSync('counter.js', '      options.method !== "GET"\n');
    fs.appendFileSync('counter.js', '        ? {\n');
    fs.appendFileSync('counter.js', '            "content-type": "application/json",\n');
    fs.appendFileSync('counter.js', '            "content-length": Buffer.byteLength(options.body),\n');
    fs.appendFileSync('counter.js', '          }\n');
    fs.appendFileSync('counter.js', '        : {};\n');
    fs.appendFileSync('counter.js', '    const req = https.request(url, { ...options, headers }, response => {\n');
    fs.appendFileSync('counter.js', '      let data = "";\n');
    fs.appendFileSync('counter.js', '      response.on("data", chunk => {\n');
    fs.appendFileSync('counter.js', '        data += chunk;\n');
    fs.appendFileSync('counter.js', '      });\n');
    fs.appendFileSync('counter.js', '      response.on("end", () => {\n');
    fs.appendFileSync('counter.js', '        const { statusCode } = response;\n');
    fs.appendFileSync('counter.js', '        if (statusCode >= 400) {\n');
    fs.appendFileSync('counter.js', '          reject(new HttpError(statusCode, data));\n');
    fs.appendFileSync('counter.js', '        } else {\n');
    fs.appendFileSync('counter.js', '          const body = JSON.parse(data);\n');
    fs.appendFileSync('counter.js', '          resolve(body);\n');
    fs.appendFileSync('counter.js', '        }\n');
    fs.appendFileSync('counter.js', '      });\n');
    fs.appendFileSync('counter.js', '    });\n');
    fs.appendFileSync('counter.js', '    req.on("error", reject);\n');
    fs.appendFileSync('counter.js', '    if (options.body) {\n');
    fs.appendFileSync('counter.js', '      req.write(options.body);\n');
    fs.appendFileSync('counter.js', '    }\n');
    fs.appendFileSync('counter.js', '    req.end();\n');
    fs.appendFileSync('counter.js', '  });\n');
    fs.appendFileSync('counter.js', '}\n');
    fs.appendFileSync('counter.js', '\n');
    fs.appendFileSync('counter.js', 'class HttpError extends Error {\n');
    fs.appendFileSync('counter.js', '  constructor(statusCode, msg) {\n');
    fs.appendFileSync('counter.js', '    super(msg);\n');
    fs.appendFileSync('counter.js', '    this.statusCode = statusCode;\n');
    fs.appendFileSync('counter.js', '  }\n');
    fs.appendFileSync('counter.js', '}\n');

    await utils.functions.add('./counter.js')
  },
}
