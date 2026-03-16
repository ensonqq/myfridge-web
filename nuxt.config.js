import colors from 'vuetify/es5/util/colors'
import locale from './locale'

export default {
  server : {
    port : 3000,
    host : 0
  },
  // server-side rendering
  ssr    : false,
  mode   : 'spa',
  target : 'static',
  router : {
    middleware : ['profile', "route"],
    extendRoutes (routes, resolve) {
      routes.push(
        {
          name      : 'Home',
          path      : '/', // <--- change this
          component : resolve(__dirname, 'pages/index.vue'),
          chunkName : 'pages/index',
          children  : [
            /* nested routes for category, chicken/dimsum/box */
            {
              path  : '/:catName', // <--- change this
              props : true
            },
            /* nested routes for product detail */
            {
              path  : '/product/:productName', // <--- change this
              props : true // <--- props to pass productId as params
            }
          ]
        },
      )
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head : {
    titleTemplate : '%s-即食雞胸|點心|健康|無激素',
    title         : 'Optmeal',
    htmlAttrs     : {
      lang : 'zh'
    },
    meta          : [
      { charset : 'utf-8' },
      { name : 'viewport', content : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      {
        hid     : 'description', name : 'description',
        content : '產品每日新鮮香港製造，即食雞胸，雞胸燒賣，餐盒，堅持不添加防腐劑，使用無激素雞胸，保證新鮮健康，提供高品質的即食雞胸肉，以配合全天候健身目標。豐富蛋白質，增肌減脂必備，可配合減肥餐單使用，效果顯注， #不含味精 #不含防腐 #每日新鮮香港制造。'
      },
      {
        name    : 'keywords',
        content : '即食雞胸,即食燒賣,雞胸燒賣,餐盒,蜜糖柚子味,醬油味雞胸,黑椒味雞胸,葡式酸辣味雞胸,蒜辣味雞胸,韓式辣醬味雞胸,蜜糖芥末味,咖喱味雞胸,蕃茄味雞胸,香草味雞胸,鹽焗雞味雞胸,麻辣味雞胸,孜然味雞胸,飲食,增肌,瘦身飲食,即食,速食雞胸,雞胸肉,即食雞胸肉,香港即食雞胸,即食雞胸肉香港,健康餐,即食雞胸肉推薦香港,微波即食雞胸肉,即食雞胸肉hk,雞胸肉香港,即食雞胸，香港製造，雞胸肉，健身，減肥，燒脂，meal prep hong kong , healthy meal, healthy lunch, fitness, fitness food, protein'
      },
      { name : 'format-detection', content : 'telephone=no' },
      {
        name    : 'description',
        content : '產品每日新鮮香港製造，即食雞胸，雞胸燒賣，餐盒，堅持不添加防腐劑，使用無激素雞胸，保證新鮮健康，提供高品質的即食雞胸肉，以配合全天候健身目標。豐富蛋白質，增肌減脂必備，可配合減肥餐單使用，效果顯注， #不含味精 #不含防腐 #每日新鮮香港制造。'
      },
      {
        name    : 'og:description',
        content : '產品每日新鮮香港製造，即食雞胸，雞胸燒賣，餐盒，堅持不添加防腐劑，使用無激素雞胸，保證新鮮健康，提供高品質的即食雞胸肉，以配合全天候健身目標。豐富蛋白質，增肌減脂必備，可配合減肥餐單使用，效果顯注， #不含味精 #不含防腐 #每日新鮮香港制造。'
      },
      {
        name    : 'og:image',
        content : '/favicon.png'
      },
      {
        name    : 'twitter:description',
        content : '產品每日新鮮香港製造，即食雞胸，雞胸燒賣，餐盒，堅持不添加防腐劑，使用無激素雞胸，保證新鮮健康，提供高品質的即食雞胸肉，以配合全天候健身目標。豐富蛋白質，增肌減脂必備，可配合減肥餐單使用，效果顯注， #不含味精 #不含防腐 #每日新鮮香港制造。'
      },
      {
        name    : 'twitter:image',
        content : '/favicon.png'
      }
    ],
    link          : [
      { rel : 'icon', type : 'image/x-icon', href : '/favicon.png' },
      {
        rel    : 'stylesheet',
        media  : 'print',
        onload : "this.media='all'; this.onload = null",
        href   : 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;900&amp;display=swap',
      },
    ],
    script        : [
      { src : 'https://js.stripe.com/v3' }
    ],
  },

  loadingIndicator : {
    name : '~/assets/_loading.html'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css : ["@/assets/scss/foodtruck.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins : [
    { src : '~/plugins/api', ssr : false },
    { src : '~/plugins/validations', ssr : false },
    { src : '~/plugins/errors', ssr : false }
  ],

  middleware : ["auth"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components : {
    dirs : [
      '~/components',
      '~/components/session'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules : [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/device'
  ],

  modules : [
    ['nuxt-i18n',
      {
        locales               : ['zh', 'en'],
        defaultLocale         : 'zh',
        detectBrowserLanguage : {
          useCookie : true,
          cookieKey : 'locale'
        },
        strategy              : 'no_prefix',
        parsePages            : false,
        vueI18n               : {
          fallbackLocale : 'zh',
          messages       : {
            zh : locale.zh,
            en : locale.en
          }
        }
      }
    ],
    ['@nuxtjs/google-tag-manager', { id : 'GTM-P32F3P3', pageTracking : true }]
  ],
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify : {
    customVariables : ['~/assets/variables.scss'],
    defaultAssets   : false,
    treeShake       : true,
    theme           : {
      light : true,

      themes : {
        light : {
          primary : '#D23F57',
          // accent: '#0F3460',
          secondary : '#c6773c',
          info      : colors.teal.lighten1,
          warning   : colors.amber.base,
          error     : '#FF5353',
          success   : colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build : {
    babel : {
      plugins : [
        // ["@babel/plugin-proposal-class-properties", { "loose": true }],
        // ["@babel/plugin-proposal-private-methods", { "loose": true }],
        // ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ]
    }
  }
}
