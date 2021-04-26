const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');//extracts components css into a separate file
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CssnanoPlugin = require('cssnano-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src') + '/js/app.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader, // instead of style-loader
                    {
                        loader: "css-loader",
                        options: {
                            // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                            // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            /*  plugins: (loader) => {
                                  return [
                                      require('autoprefixer')(),
                                      require('cssnano')(),
                                  ];
                              }*/
                        }
                    },
                    // Can be `less-loader`
                    {
                        loader: "sass-loader",
                    },
                ]
            },
            // Fonts and SVGs
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            // Images
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                    }
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            }
        ]
    },
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            `...`,
            new TerserPlugin({
                    parallel: true,
                    extractComments: false,
                    terserOptions: {
                        compress: true,
                        mangle: true,
                        comments: false,
                    },
                }
            ),
            new CssnanoPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', path.join(process.cwd(), 'extra/**/*')]
        }),
/*        require('postcss-preset-env')({
            browsers: 'last 2 versions',
        }),*/
        new MiniCSSExtractPlugin({
            linkType: 'text/css',
            filename: "vi.css",
        }),
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html', // output file
        }),
    ]
}
