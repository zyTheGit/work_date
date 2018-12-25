let path_lib = require("path");

module.exports = {
    entry: "./index.js",
    mode: "development", //production,developemnt
    output: {
        filename: "bundle.js",
        path: path_lib.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        // modules: true
                    }
                }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    }
};