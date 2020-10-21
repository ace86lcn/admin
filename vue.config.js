module.exports = {
    devServer: {
      port: 8888,     // 端口号
    },
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: process.env.outputDir,
    //放置生成的静态资源(js、css、img、fonts)的(相对于outputDir)目录
    assetsDir: './static'
}