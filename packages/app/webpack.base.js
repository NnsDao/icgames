/* eslint-disable camelcase */

const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const babel = require('@horse-racing/dev/config/babel-config-webpack.cjs');
const findPackages = require('../../scripts/findPackages');

function mapChunks(name, regs, inc) {
  return regs.reduce(
    (result, test, index) => ({
      ...result,
      [`${name}${index}`]: {
        chunks: 'initial',
        enforce: true,
        name: `${name}.${`0${index + (inc || 0)}`.slice(-2)}`,
        test
      }
    }),
    {}
  );
}

function createWebpack(context, mode = 'production') {
  const pkgJson = require(path.join(context, 'package.json'));
  const alias = findPackages().reduce((alias, { dir, name }) => {
    alias[name] = path.resolve(context, `../${dir}/src`);

    return alias;
  }, {});
  const plugins = fs.existsSync(path.join(context, 'public'))
    ? new CopyWebpackPlugin({ patterns: [{ from: 'public' }] })
    : [];

  return {
    target: 'web',
    context,
    entry: ['@babel/polyfill', './src/index.tsx'],
    mode,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, require.resolve('css-loader')]
        },
        {
          test: /\.less/,
          use: [
            MiniCssExtractPlugin.loader,
            require.resolve('css-loader'),
            {
              loader: require.resolve('less-loader'),
              options: {
                lessOptions: {
                  modifyVars: {
                    '@primary-color': '#000000',
                    '@processing-color': '#000000',
                    '@black': '#252525',
                    '@link-color': '#000000',
                    '@error-color': '#D81E06',
                    '@border-color-base': '#8D8D8D',
                    '@border-color-split': '#636364',
                    '@input-placeholder-color': '#5f5f5f',
                    '@font-size-base': '14px',
                    '@heading-1-size': '44px',
                    '@heading-2-size': '38px',
                    '@heading-3-size': '32px',
                    '@heading-4-size': '26px',
                    '@heading-5-size': '20px',
                    '@component-background': '#FFFFFF',
                    '@item-hover-bg': '#f4f4f4',
                    // modal
                    '@modal-header-bg': '#FFFFFF',
                    '@modal-header-border-color-split': 'transparent',
                    '@modal-close-color': '@primary-color',
                    '@modal-header-padding': '20px 28px',
                    '@modal-border-radius': '5px',
                    // text color,
                    '@text-color': '#1E1E1E',
                    '@text-color-secondary': 'fade(#1E1E1E, 45%)',
                    '@text-color-inverse': '@black',
                    '@icon-color': 'inherit',
                    '@icon-color-hover': 'fade(@primary-color, 75%)',
                    '@heading-color': '#1E1E1E',
                    '@text-color-dark': 'fade(@black, 85%)',
                    '@text-color-secondary-dark': 'fade(@black, 65%)',
                    '@select-item-selected-bg': '#FFFFFF'
                  },
                  javascriptEnabled: true
                }
              }
            }
          ]
        },
        {
          exclude: /(node_modules)/,
          test: /\.(js|mjs|ts|tsx|app)$/,
          use: [
            require.resolve('thread-loader'),
            {
              loader: require.resolve('babel-loader'),
              options: {
                ...babel,
                // presets: ['@babel/preset-env'],
                plugins: [
                  ...babel.plugins,
                  [
                    'import',
                    {
                      libraryName: 'antd',
                      style: true
                    }
                  ]
                  // '@babel/plugin-proposal-export-namespace-from'
                ]
              }
            }
          ]
        },
        {
          test: /\.md$/,
          use: [require.resolve('html-loader'), require.resolve('markdown-loader')]
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                esModule: false,
                limit: 10000,
                name: 'static/[name].[contenthash:8].[ext]'
              }
            }
          ]
        },
        {
          test: [/\.eot$/, /\.ttf$/, /\.woff$/, /\.woff2$/],
          use: [
            {
              loader: require.resolve('file-loader'),
              options: {
                esModule: false,
                name: 'static/[name].[contenthash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    node: {
      __dirname: true,
      __filename: false
    },
    optimization: {
      minimize: mode === 'production',
      splitChunks: {
        cacheGroups: {
          ...mapChunks('react', [
            /* 00 */ /node_modules\/(@fortawesome)/,
            /* 01 */ /node_modules\/(@emotion|@stardust|classnames|chart\.js|codeflask|copy-to-clipboard|file-selector|file-saver|hoist-non-react|i18next|jdenticon|keyboard-key|mini-create-react|popper\.js|prop-types|qrcode-generator|react|remark-parse|styled-components)/
          ]),
          ...mapChunks('other', [
            /* 00 */ /node_modules\/(@babel|ansi-styles|asn1|browserify|buffer|history|html-parse|inherit|lodash|object|path-|parse-asn1|pbkdf2|process|public-encrypt|query-string|readable-stream|regenerator-runtime|repeat|rtcpeerconnection-shim|safe-buffer|stream-browserify|store|tslib|unified|unist-util|util|vfile|vm-browserify|webrtc-adapter|whatwg-fetch)/,
            /* 01 */ /node_modules\/(attr|brorand|camelcase|core|chalk|color|create|cuint|decode-uri|deep-equal|define-properties|detect-browser|es|event|evp|ext|function-bind|has-symbols|ieee754|ip|is|lru|markdown|minimalistic-|moment|next-tick|node-libs-browser|random|regexp|resolve|rxjs|scheduler|sdp|setimmediate|timers-browserify|trough)/,
            /* 03 */ /node_modules\/(base-x|base64-js|blakejs|bip|bn\.js|cipher-base|crypto|des\.js|diffie-hellman|elliptic|hash|hmac|js-sha3|md5|miller-rabin|ripemd160|secp256k1|scryptsy|sha\.js|xxhashjs)/
          ])
        }
      }
    },
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[contenthash:8].js',
      globalObject: "(typeof self !== 'undefined' ? self : this)",
      path: path.join(context, 'build'),
      publicPath: ''
    },
    performance: {
      hints: false
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser.js'
      }),
      new webpack.IgnorePlugin({
        contextRegExp: /moment$/,
        resourceRegExp: /^\.\/locale$/
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(mode),
          VERSION: JSON.stringify(pkgJson.version)
        }
      }),
      new webpack.optimize.SplitChunksPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css'
      })
    ].concat(plugins),
    resolve: {
      alias: {
        ...alias,
        'react/jsx-runtime': require.resolve('react/jsx-runtime')
      },
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
      fallback: {
        assert: require.resolve('assert/'),
        buffer: require.resolve('buffer/'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify')
      }
    }
  };
}

module.exports = createWebpack;
