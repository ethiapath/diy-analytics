module.exports = {
  async onPreBuild({ utils }) {
    await utils.functions.add('./counter.js')
  },
}
