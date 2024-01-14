const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  pwa: {
    name: "DotsAndBoxes",
    themeColor: "#483C6C",
    mobileWebAppCapable: 'yes',
    mobileWebAppCache: 'yes',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppCache: 'yes',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/index.html',
      skipWaiting: true,
      clientsClaim: true
    },
    manifestOptions: {
      name: "DotsAndBoxes",
      short_name: "DaB",
      start_url: '.',
      display: 'standalone',
      theme_color: '#fefefe',
      icons:[{
        src:"./images/Logo_192x192.png",
        sizes: "192x192",
        type: "image/png"
      }]
    }
  }
})
