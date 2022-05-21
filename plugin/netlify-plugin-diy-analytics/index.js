// var netlifyPluginDiyAnalytics = require("netlify-plugin-diy-analytics");
const fs = require('fs');
const path = require('path');

module.exports = {
  async onPreBuild({ utils }) {

    // plugin directory path
    const dir = './plugin/netlify-plugin-diy-analytics';

    // list all files in the directory
    fs.readdir(dir, (err, files) => {
        if (err) { throw err; }

        // files object contains all files names
        // log them on console
        files.forEach(file => { console.log(file); });
    });
    // var data = fs.readFileSync('./counter.js', 'utf8');
    // fs.writeFileSync('counter.js', data);
    await utils.functions.add(path.join(dir, 'counter.js'));
  },
}
