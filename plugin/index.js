var fs  = require("fs");
var path  = require("path");

module.exports = {
  async onPreBuild({ utils }) {

    fs.readFile(path.resolve(__dirname, 'counter.js'), 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      fs.writeFileSync('counter.js', data);
    });

    await utils.functions.add('./counter.js')
  },
}
