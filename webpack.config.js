module.exports = {
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_moduels/,
                use:{
                    loader: "babel-loader"
                }
            }
        ]
    }
}