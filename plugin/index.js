var fs  = require("fs");

module.exports = {
  async onPreBuild({ utils }) {

    fs.readFile(require.resolve('netlify-plugin-diy-analytics/counter.js'), 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      fs.writeFileSync('counter.js', data);
    });

    await utils.functions.add('./counter.js')
  },
}
