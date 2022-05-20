var netlifyPluginDiyAnalytics = require("netlify-plugin-diy-analytics");
var fs  = require("fs");

module.exports = {
  async onPreBuild({ utils }) {
    var data = fs.readFileSync(require.resolve('netlify-plugin-diy-analytics/counter.js'), 'utf8');
    fs.writeFileSync('counter.js', data);
    await utils.functions.add('./counter.js')
  },
}
