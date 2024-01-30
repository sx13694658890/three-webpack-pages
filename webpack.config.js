const path = require('path')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HappyPack = require("happypack");
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
const happyThreadPool = HappyPack.ThreadPool({ size: 5 })
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const configuration = {};
const fs=require('fs')
const pubUrl=path.resolve(__dirname,'./public')
const dirLists=fs.readdirSync(pubUrl)
const HtmlWebpackPluginPoor=[]
dirLists.forEach((file,index)=>{
    const newIndex=index==0?index:"0"+index
    HtmlWebpackPluginPoor.push(new HtmlWebpackPlugin({
        template:pubUrl+'/'+file,
        title: "webpack",
        filename: file,
        inject: "body",
        chunks: ['main'+newIndex]
    }))
})

module.exports = {
    mode: "development",
    entry: {
        react: ['react', 'react-dom'],
        main: "./main.js",
        main01: "./main01.js",
        main02: "./main02.js",
        main03: "./main03.js"
    },
    output: {
        filename: "[name]_bundle.js",
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, './dist'),

        // libraryTarget: 'umd',
    },
    //    devtool:'source-map',
    resolve: {
        mainFields: ['jsnext:main', 'browser', 'main'],
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    //    externals :['react','@babel/plugin-transform-runtime'] ,
    devServer: {
        port: 8083,
        compress: true,
        client: {
            logging: 'error',
        },
        static:{
            directory:path.resolve(__dirname,'./assets'),
            publicPath:'/assets'
        },
        proxy: {

        }
    },
    module: {
        noParse: [/react\.main\.js$/],
        rules: [
            {
                test: /\.js|jsx$/,
                use: [
                    // {loader:"happypack/loader?id=babel"},
                    {
                        loader: 'babel-loader'
                    }],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                }, 'postcss-loader']
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            filename: "[name].[ext]",

                        }
                    },
                ],
            },
            {
                test: /\.glsl$/,
                use: [
                    {
                        loader:"webpack-glsl-loader",
                    },
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new HappyPack({
        //     id:"babel",
        //     loaders:['babel-loader'],
        //     verbose:true,
        //     threadPool:happyThreadPool
        // }),
        ...HtmlWebpackPluginPoor,
        
        new MiniCssExtractPlugin({
            filename: "./css/[name].css"
        }),
        // new ParallelUglifyPlugin({
        //     uglifyJS:{
        //         output:{
        //             beautify:false,
        //             comments:false
        //         },
        //         compress:{
        //             //内嵌己定义但是只用到一次的变量 
        //             collapse_vars : true ,
        //         },
        //     }
        // }),
        // new ModuleConcatenationPlugin(),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8888,
        //     reportFilename: 'report.html',
        //     defaultSizes: 'parsed',
        //     openAnalyzer: false,
        //     generateStatsFile: false,
        //     statsFilename: 'stats.json',
        //     logLevel: 'info'
        //   })
        // new PrepackWebpackPlugin()
        // new CopyPlugin({
        //     patterns: [
        //       { from: "./images", to: "images" },
        //     ],
        //   }),
        // new WorkboxPlugin.GenerateSW({
        //     // 这些选项帮助快速启用 ServiceWorkers
        //     // 不允许遗留任何“旧的” ServiceWorkers
        //     clientsClaim: true,
        //     skipWaiting: true,
        //   }),
    ],
    //    optimization:{
    //     minimize:true,
    //     minimizer:[new TerserPlugin({
    //         test: /\.js(\?.*)?$/i,
    //         parallel:true,
    //         minify: TerserPlugin.uglifyJsMinify,
    //         terserOptions:{

    //         }

    //     })],

    // splitChunks:{
    //     chunks: 'all',
    //     minSize: 20000,
    //     minRemainingSize: 0,
    //     minChunks: 1,
    //     maxAsyncRequests: 30,
    //     maxInitialRequests: 30,
    //     enforceSizeThreshold: 50000,
    //     cacheGroups: {
    //         defaultVendors: {
    //           test: /[\\/]node_modules[\\/]/,
    //           priority: -10,
    //           reuseExistingChunk: true,
    //         },
    //         default: {
    //           minChunks: 2,
    //           priority: -20,
    //           reuseExistingChunk: true,
    //         },
    //       },
    // }
    //    }
}

