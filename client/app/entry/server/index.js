/**
 * 请确保该文件是唯一的 Node.js 入口文件
 *
 * 支持 JSX, dynamic import
 *
 * 会自动忽略使用 require 引用的 css|less|sass|scss 等文件，
 * 请勿使用 import 来引用上述样式文件
 */

require('babel-register')({
  presets: [
    ['env', {
      targets: {
        node: '8',
      },
    }],
    'react',
    'stage-2',
  ],
  plugins: [
    'dynamic-import-node',
    ['transform-runtime', {
      polyfill: false,
      regenerator: true,
    }],
    [
      'babel-plugin-transform-require-ignore', {
        extensions: ['.css', '.less', '.sass', '.scss'],
      },
    ],
  ],
  extensions: ['.jsx', '.js'],
});

module.exports = {
  App: require('./app').default,
  reducer: require('../../store/reducer').default,
};
