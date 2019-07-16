const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://app:3000",
        "changeOrigin": false,
        "secure": false,
        "logLevel": "debug"
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([{
          from: 'src/sw/idb.js',
          to: 'js/idb.js'
        },
        {
          from: 'src/sw/sw-background-sync.js',
          to: 'js/sw-background-sync.js'
        },
        {
          from: 'src/sw/sw-push.js',
          to: 'js/sw-push.js'
        }
      ])
    ]
  },
  pwa: {
    name: 'Twork',
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    debug: false,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      importScripts: ['js/idb.js', 'js/sw-background-sync.js', 'js/sw-push.js']
    }
  },
}
