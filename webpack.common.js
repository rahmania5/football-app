const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
 
module.exports = {
    entry: {
        index: './src/main.js',
        match: './src/match.js',
        nav: './src/nav.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template/index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/template/match.html",
            filename: "match.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/template/nav.html",
            filename: "nav.html"
        })
    ]
}