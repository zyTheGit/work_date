let path_lib = require("path");

module.exports = {
    entry: "./index.es5.js",
    mode:"development",
    output: {
        filename: "bundle.js",
        path: path_lib.resolve("dist")
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
        }]
    }
};