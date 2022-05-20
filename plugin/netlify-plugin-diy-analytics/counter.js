const https = require('https');

// never write your own node-fetch
function fetch(url, options = { method: "GET" }) {
  return new Promise((resolve, reject) => {
    const headers =
      options.method !== "GET"
        ? {
            "content-type": "application/json",
            "content-length": Buffer.byteLength(options.body),
            ...(options.headers ? options.headers : {})
          }
        : {};
    const req = https.request(url, { ...options, headers }, response => {
      let data = "";
      response.on("data", chunk => {
        data += chunk;
      });
      response.on("end", () => {
        const { statusCode } = response;
        if (statusCode >= 400) {
          reject(new HttpError(statusCode, data));
        } else {
          const body = JSON.parse(data);
          resolve(body);
        }
      });
    });
    req.on("error", reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

class HttpError extends Error {
  constructor(statusCode, msg) {
    super(msg);
    this.statusCode = statusCode;
  }
}
// const ANALYTICS_URL = process.env.ANALYTICS_URL;
const BASEURL = process.env.JSONBIN_BASE_URL; // base url for jsonbin

exports.handler = async ({ headers }) => {
  if (BASEURL) {
    // referer is the page the request came from
    // e.g. https://oliverjam.es/blog/
    const referer = headers.referer;
    const ua = headers["user-agent"];
    // pathname is the bit after the domain
    // e.g. /blog/
    const { pathname } = new URL(referer);

    try {
      // push a new record for this url & UA
      const body = JSON.stringify({ url: pathname, ua });
      const res = await fetch(`${BASEURL}/v3/c`, { 
        method: "POST", 
        body, 
        headers: {
          "X-Master-Key": process.env.MASTER_KEY, 
          "X-Collection-Id": "6286d082449a1f3821e50552" // 
        }
      }); 
      console.log(res)
    } catch (error) {
      console.log('counter.js')
      console.log(error);
    }
  }

  // returns a transparent gif
  return {
    statusCode: 200,
    body: "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    headers: { "content-type": "image/gif" },
    isBase64Encoded: true,
  };
};
