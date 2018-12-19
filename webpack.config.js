let path_lib = require("path");

module.exports = {
    entry: "./index.es5.js",
    mode: 'production',
    output: {
        filename: "bundle.es5.js",
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