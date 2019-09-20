const path = require('path');
const webpack = require('webpack');

const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = (env, argv) => {

    let isDev = argv.mode !== 'production';

    return {


        /**
         * ==================================================================================
         * Development
         * ==================================================================================
         **/

        mode: isDev ? 'development' : 'production',
        devtool: isDev ? 'inline-source-map' : false,
        devServer: {
            contentBase: './',
            // hot: true
        },




        /**
         * ==================================================================================
         * Configuration
         * ==================================================================================
         **/

        entry: {
            app: './src/js/app.js',
        },
        output: {
            filename: isDev ? '[name].js' : '[name].[hash].min.js',
            publicPath: './',
            path: path.resolve(__dirname, 'dist')

            /**
             * For github purposes!
             */
            // publicPath: './vue-elements/',
            // path: path.resolve(__dirname, 'gh-pages')

        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    },
                    styles: {
                        test: /\.(sa|sc|c)ss$/,
                        name: 'styles',
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },


        resolve: {
            modules: ['node_modules'],
            alias: {
                vue$: 'vue/dist/vue.common.js',
            }
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: !isDev,
                debug: isDev
            }),

            new webpack.ProvidePlugin({}),

            new Dotenv(),

            new CleanWebpackPlugin({
                /**
                 * !@TEMPORARY FIX: Webpack doesn't copy the specified static files on `watch` mode updates.
                 * Disables cleaning on `dev`/`watch` builds to avoid this for now
                 */
                dry: isDev,
            }),

            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),

            new MiniCssExtractPlugin({
                filename: isDev ? '[name].css' : '[name].[hash].css',
                chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
            }),

            new CopyWebpackPlugin([
                {from: 'src/favicon.ico', to: ''},
                {from: 'src/images/', to: 'images'}
            ]),

            new VueLoaderPlugin()
        ],


        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: isDev,
                                reloadAll: true,
                            },
                        },
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                }
            ]
        }
    }
};