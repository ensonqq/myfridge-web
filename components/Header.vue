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
        "name"           : "即食雞胸肉",
        "url"            : "https://myfridgehk.com/",
        "image"          : "https://myfridgehk.com/favicon.png",
        "description"    : "myfridge 即食雞胸|雞胸燒賣|全港最受歡迎雞胸品牌|每日新鮮製造 我們堅持不添加防腐劑，使用無激素雞胸，保證新鮮健康，提供高品質的雞胸燒賣肉，以配合全天候健身目標。雞胸含有豐富蛋白質，男仕增肌減脂必備，雞胸低脂飽腹的特質，女生可配合減肥餐單使用，效果顯注， #不含味精 #不含防腐 #每日新鮮香港制造。",
        "brand"          : {
          "@type": "Thing",
          "name" : "myfridge"
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
