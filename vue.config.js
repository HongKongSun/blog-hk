const webpack = require("webpack");
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    productionSourceMap: false,

    css: {
        extract: false,

    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                FinD: "@weus/fuc-design"
            })
        ]
    },
    chainWebpack: (config) => {
        config.module.rules.delete("svg");
        config.module
            .rule('svg')
            .test(/\.svg$/)
            .include
            .add(resolve('./src/assets/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
    },


}