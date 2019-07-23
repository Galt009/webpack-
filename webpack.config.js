//由于 webpack 是基于Node进行构建的，所以webpack的配置文件中，任何合法的Node代码都是支持的
var path =  require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')

//当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供要打包的文件的 入口 和 出口 文件，此时，工具会检查根目录中的配置文件，并读取这个文件，就拿到了导出的这个对象，进行打包构建
module.exports = {
    entry: path.join(__dirname, './src/main.js'),//入口
    output: {
        path: path.join(__dirname,'./dist'),//出口
        filename: 'bundle.js'//指定输出文件的名称
    },
    plugins: [ //所有webpack插件的配置节点
        new htmlWebpackPlugin({
        template: path.join(__dirname, './src/index.html'), //指定模板文件路径
        filename: 'index.html' //设置生成的内存页面的名称
        })
    ],
    module: {     //配置所有第三方loader模块
        rules: [     //第三方模块的匹配规则
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            { test: /\.less$/, use: [ 'style-loader', 'css-loader', 'less-loader' ] },
            { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=6000&name=[hash:8]-[name].[ext]' },
            //处理字体文件
            {test:/\.(ttf|eot|svg|woff|woff2|otf)$/, use: 'url-loader'} 
        ]
    }
}
