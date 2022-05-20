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

module.exports = {
  fetch
}
