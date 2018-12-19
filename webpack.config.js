let path_lib = require("path");

module.exports = {
    entry: "./index.js",
    mode: 'production',
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