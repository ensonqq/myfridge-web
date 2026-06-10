<template>
  <div class="appHeader" id="appHeader">
    <v-app-bar fixed color="#eee" elevate-on-scroll width="100%">
      <v-container class="d-flex align-center site-header">
        <nuxt-link to="/" class="d-flex align-center justify-start text-decoration-none black--text">
          <div class="weblogo responsive-handling" alt=""/>
        </nuxt-link>

        <v-spacer></v-spacer>
        <Promo></Promo>
        <AccountButton></AccountButton>

        <!-- shopping cart button -->
        <CartButton light text tile></CartButton>

        <!-- navigation burger button -->
        <v-btn icon @click="toggleNavDrawer(true)" light tile>
          <v-icon large>{{ icons.mdiMenu }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- prize button -->
    <FloatingPrizeButton></FloatingPrizeButton>

    <!-- shopping cart button -->
    <FloatingCartButton></FloatingCartButton>

    <div class="structured-data">
      <script type="application/ld+json">
      {
        "@context"       : "http://schema.org/",
        "@type"          : "Product",
        "name"           : "凍肉",
        "url"            : "https://myfridgehk.com/",
        "image"          : "https://myfridgehk.com/favicon.png",
        "description"    : "My Fridge 為本地信譽急凍食品進口及分銷商，母公司滿記凍肉有限公司設有大型衛生加工工場，專營從美國、加拿大、澳洲、紐西蘭等國家進口的優質肉類及海產。憑藉多年為香港多間連鎖餐廳食肆供應食材的經驗，我們對凍肉處理及品質監控極具心得。本店提供安心可靠的網上購物服務，讓您安坐家中即可選購環球優質美食。My Fridge 已領取食物環境衞生署許可証，並榮獲 ISO 22000:2018 及 HACCP 食品安全管理體系認證，確保每一件產品的來源及處理程序均有嚴格保證。除零售外，我們亦歡迎企業查詢批發及各類合作計劃。",
        "brand"          : {
          "@type": "Thing",
          "name" : "MyFridge"
        },
        "aggregateRating": {
          "@type"      : "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "28632"
        },
        "offers"         : {
          "@type"        : "Offer",
          "priceCurrency": "HKD",
          "price"        : "150",
          "availability" : "InStock"
        }
      }
      </script>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations}             from 'vuex'
import {mdiCartOutline, mdiMenu, mdiSchool} from "@mdi/js"

export default {
  methods  : {
    ...mapMutations(['toggleNavDrawer'])
  },
  computed : {
    ...mapState(['prize'])
  },
  mounted () {
    // if (this.prize && ['/', '/Chicken', '/Dimsum', '/Box', '/Whey', '/Trial'].includes(this.$route.path)) {
    // if (['/', '/Chicken', '/Dimsum', '/Box', '/Whey', '/Trial'].includes(this.$route.path)) {
    //   const app = document.getElementById('appHeader');
    //   let cnt = 0
    //
    //   function addDollar () {
    //     const span = document.createElement('SPAN');
    //     span.classList.add('dollar-container');
    //     span.style.fontSize = 20 + Math.random() * 40 + 'px';
    //     span.style.left = Math.random() * window.innerWidth + 'px';
    //     span.style.animationDuration = 1 + Math.random() * 3 + 's';
    //
    //     const icon = document.createElement('div');
    //
    //     const bgImageType = Math.floor(Math.random() * 3) + 1
    //
    //     icon.classList.add('red-pocket');
    //     // icon.classList.add('snow' + bgImageType);
    //     icon.style.animationDuration = 1 + Math.random() * 3 + 's';
    //
    //
    //     span.appendChild(icon);
    //     app.appendChild(span);
    //
    //     cnt++
    //     setTimeout(() => {
    //       span.remove();
    //       // app.remove();
    //     }, 6000);
    //   }
    //
    //   let freq = 75
    //   if (window.innerWidth >= 800) {
    //     freq = 50
    //   }
    //   const red_packet_play = setInterval(addDollar, freq);
    //
    //   const self = this
    //   setTimeout(() => {
    //     clearInterval(red_packet_play)
    //     self.animationPlayed = true
    //   }, 2000);
    // }
  },
  data () {
    return {
      icons           : {
        mdiCartOutline,
        mdiMenu,
        mdiSchool
      },
      animationPlayed : false,
      drawer          : false,
      group           : null,
      dialog          : false,
    }
  }
}
</script>
