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
    titleTemplate : '%s-|優質肉類·環球海產·風味醃肉·燒烤食材 ',
    title         : 'My Fridge',
    htmlAttrs     : {
      lang : 'zh'
    },
    meta          : [
      { charset : 'utf-8' },
      { name : 'viewport', content : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      {
        hid     : 'description', name : 'description',
        content : 'My Fridge 為本地信譽急凍食品進口及分銷商，母公司滿記凍肉有限公司設有大型衛生加工工場，專營從美國、加拿大、澳洲、紐西蘭等國家進口的優質肉類及海產。憑藉多年為香港多間連鎖餐廳食肆供應食材的經驗，我們對凍肉處理及品質監控極具心得。本店提供安心可靠的網上購物服務，讓您安坐家中即可選購環球優質美食。My Fridge 已領取食物環境衞生署許可証，並榮獲 ISO 22000:2018 及 HACCP 食品安全管理體系認證，確保每一件產品的來源及處理程序均有嚴格保證。除零售外，我們亦歡迎企業查詢批發及各類合作計劃。'
      },
      {
        name    : 'keywords',
        content : '優質肉類, 環球海產, 牛扒, 安格斯牛扒, 西冷牛扒, 肉眼扒, 斧頭扒, T骨扒, 封門柳, 牛頸脊, 豬扒, 西班牙黑毛豬, 豬梅肉, 豬頸肉, 豬腩肉, 鵪鶉脾, 羊扒, 羊肉, 自家製醃肉, 黑椒醃肉, 香茅醃肉, 蒜蓉醃肉, 麻辣, 香港風味, 火鍋片, 燒肉片, 加熱即食, 即食料理包, 急凍熟食, 白鱈魚, 銀鱈魚, 鱈魚扒, 三文魚扒, 帶子, 青口, 蝦仁, 比目魚柳, 帶子, 虎蝦, 急凍蔬菜, 寵物凍肉, 寵物食品, BBQ, 每月推介, 火炭自取, 免費送貨, 滿$300免運費, 香港網上肉店, 冷凍食材, 冰鮮肉類, 燒烤食材, 燒烤包, 生酮食材, 家庭煮食, 安坐家中選購, 網上購物, 食環署許可證, ISO 22000:2018, HACCP 認證, 急凍食品分銷商, 凍肉批發'
      },
      { name : 'format-detection', content : 'telephone=no' },
      {
        name    : 'description',
        content : 'My Fridge 為本地信譽急凍食品進口及分銷商，母公司滿記凍肉有限公司設有大型衛生加工工場，專營從美國、加拿大、澳洲、紐西蘭等國家進口的優質肉類及海產。憑藉多年為香港多間連鎖餐廳食肆供應食材的經驗，我們對凍肉處理及品質監控極具心得。本店提供安心可靠的網上購物服務，讓您安坐家中即可選購環球優質美食。My Fridge 已領取食物環境衞生署許可証，並榮獲 ISO 22000:2018 及 HACCP 食品安全管理體系認證，確保每一件產品的來源及處理程序均有嚴格保證。除零售外，我們亦歡迎企業查詢批發及各類合作計劃。'
      },
      {
        name    : 'og:description',
        content : 'My Fridge 為本地信譽急凍食品進口及分銷商，母公司滿記凍肉有限公司設有大型衛生加工工場，專營從美國、加拿大、澳洲、紐西蘭等國家進口的優質肉類及海產。憑藉多年為香港多間連鎖餐廳食肆供應食材的經驗，我們對凍肉處理及品質監控極具心得。本店提供安心可靠的網上購物服務，讓您安坐家中即可選購環球優質美食。My Fridge 已領取食物環境衞生署許可証，並榮獲 ISO 22000:2018 及 HACCP 食品安全管理體系認證，確保每一件產品的來源及處理程序均有嚴格保證。除零售外，我們亦歡迎企業查詢批發及各類合作計劃。'
      },
      {
        name    : 'og:image',
        content : '/favicon.png'
      },
      {
        name    : 'twitter:description',
        content : 'My Fridge 為本地信譽急凍食品進口及分銷商，母公司滿記凍肉有限公司設有大型衛生加工工場，專營從美國、加拿大、澳洲、紐西蘭等國家進口的優質肉類及海產。憑藉多年為香港多間連鎖餐廳食肆供應食材的經驗，我們對凍肉處理及品質監控極具心得。本店提供安心可靠的網上購物服務，讓您安坐家中即可選購環球優質美食。My Fridge 已領取食物環境衞生署許可証，並榮獲 ISO 22000:2018 及 HACCP 食品安全管理體系認證，確保每一件產品的來源及處理程序均有嚴格保證。除零售外，我們亦歡迎企業查詢批發及各類合作計劃。'
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
    script        : [],
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
