<template>
  <!--TODO-->
  <!--BUY 2 get 1 free-->
  <div class="home" :class="toggleNavClass()">
    <v-card>
      <v-container class="height-1500">
        <v-row v-if="alert">
          <v-col style="background-color: #c6773c; color: white; text-align: center">
            {{ alert }}
          </v-col>
        </v-row>
        <!--        <v-row>-->
        <!--          <v-img src="//via.placeholder.com/1920x1080" max-height="100vh"></v-img>-->
        <!--        </v-row>-->
        <v-row class="flex-nowrap">
          <v-col class="px-0 px-md-1 px-lg-1 menu-wrapper">
            <v-list class="category-menu" width="100%">
              <template v-for="(item, groupName) in getGroupedCats">
                <template v-if="groupName === 'undefined'">
                  <v-list-item :to="'/' + val.name.en"
                               v-for="(val,key) in item" :key="val.id"
                               @click="toCategory(val.name.en)"
                               class="px-2 px-lg-6 px-md-6">
                    <v-list-item-content>
                      <v-list-item-title>{{ val.name[$i18n.locale] }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <template v-else>
                  <v-list-group :prepend-icon="icons.mdiAccountCircleOutline"
                                :append-icon="icons.mdiMenuUp"
                                class="px-2 px-lg-6 px-md-6"
                                :value="true"
                                no-action>
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>{{ groupName }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <v-list-item v-for="(val,key) in item"
                                 :to="'/' + val.name.en"
                                 :key="val.id"
                                 @click="toCategory(val.name.en)">
                      <v-list-item-title>{{ val.name[$i18n.locale] }}</v-list-item-title>
                    </v-list-item>
                  </v-list-group>
                </template>

              </template>
            </v-list>
          </v-col>
          <v-col class="item-wrapper">
            <v-tabs-items v-model="tab" touchless :transition="false" :reverse-transition="false">
              <v-tab-item v-for="(val,key) in categoriesWithProducts" :key="key" :value="val.name.en" :transition="false" :reverse-transition="false">
                <v-card flat>
                  <v-container class="py-6 px-2">
                    <v-row>
                      <v-col cols="12" class="pa-1">
                        <div class="float-end" v-if="topupCredits.length">
                          <v-btn @click="toggleTopUpCreditsDialog(true)" outlined depressed color="amber darken-3" class="position-relative px-1">
                            <span class="shake">
                              <v-icon color="red">{{ icons.mdiFire }}</v-icon>
                              <!--                              <v-img class="mr-2" max-width="45" contain :src="require('~/assets/images/xmas_hat.png')"></v-img>-->
                            </span>
                            {{ $t('topupButton') }}
                          </v-btn>
                        </div>
                        <h2>{{ val.name[$i18n.locale] }}</h2>
                        <div class="text-12 amber--text text--darken-3 font-weight-bold d-flex align-center" v-if="user.vipTier === 'gold'">
                          <v-icon class="text-12 amber--text text--accent-4" small>{{ icons.mdiCrown }}</v-icon>
                          {{ $t('goldMemberDiscount') }}
                        </div>
                        <div class="text-12 deep-purple--text text--darken-3 font-weight-bold" v-if="user.vipTier === 'diamond'">
                          <div class="d-flex align-center">
                            <v-icon class="text-12 deep-purple--text text--lighten-1" small>{{ icons.mdiDiamondStone }}</v-icon>
                            {{ $t('diamondMemberDiscount') }}，{{ $t('x3credits') }}
                          </div>
                        </div>
                        <!--<h6 v-if="tab === 'Whey'" class="grey&#45;&#45;lighten-1 font-weight-regular">分離乳清蛋白粉，添加消化酶及鋅，更容易吸收！</h6>-->
                        <h6 class="grey--lighten-1 font-weight-regular pb-6">{{ val.slogan[$i18n.locale] }}</h6>
                        <div class="d-flex flex-wrap grey--lighten-1 font-weight-regular text-14 pb-2" v-if="val.discountTierEnabled && getCatDiscount && getCatDiscount.length">
                          <!--                          <div class="mt-2 pa-1 br-10 text-14">{{ $t('buyMore1') }}：</div>-->
                          <div v-for="(tier,index) in getCatDiscount" class="mr-2 border-black mt-2 pa-1 br-10 text-12">
                            <div v-html="$t('catTiersHtml', { quantity : tier.quantity, value : tier.value * -1 })"></div>
                            <!--                            滿<b class="blue&#45;&#45;text text&#45;&#45;darken-4">{{ tier.quantity }}件</b>每件<b class="red&#45;&#45;text text&#45;&#45;darken-4">減{{ tier.value * -1 }}蚊</b>-->
                          </div>
                        </div>
                        <div class="d-flex flex-wrap grey--lighten-1 font-weight-regular text-14" v-if="val.buyXGetYFreeEnabled && getBuyXGetYFree && getBuyXGetYFree.length">
                          <!--                          <div class="mt-2 pa-1 br-10 text-14">{{ $t('buyMore2') }}：</div>-->
                          <div v-for="(tier,index) in getBuyXGetYFree" class="mr-2 border-black mt-2 pa-1 br-10 text-12 bg-light-red">
                            <div v-html="$t('buyXGetYFreeHtml', { x : tier.x, y : tier.y })"></div>
                            <!--
                            滿<b class="blue&#45;&#45;text text&#45;&#45;darken-4">{{ tier.quantity }}件</b>每件<b class="red&#45;&#45;text text&#45;&#45;darken-4">減{{ tier.value * -1 }}蚊</b>
                            -->
                          </div>
                        </div>
                      </v-col>
                      <!-- Special handle for dimsum -->
                      <template v-for="(item, groupName) in val.products">
                        <!-- Normal -->
                        <v-col cols="12" lg="4" md="6" sm="12" v-if="item.publish && !item.archive">
                          <CardV2 :item="item" :productName="$route.params.productName" @openProductDetail="value => activeProductName = value"/>
                          <hr color="#ddd">
                        </v-col>
                      </template>
                    </v-row>
                  </v-container>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
        <!--        <v-tabs v-model="tab" color="secondary" class="pt-16 pb-3 mobileTab" :class="{trial: showTrial}" center-active>
                  <v-tab :href="'#' + val.name.en" v-for="(val,key) in categoriesWithProducts" :key="key" @click="toCategory(val.name.en)" class="mx-0 align-start d-flex align-center">
                    <div class="d-flex align-center">
                      <v-img v-if="val.images[0]" contain max-height="60" max-width="30" :src="val.images[0].small.path"></v-img>
                      <div class="text-18 font-weight-bold position-relative">
                        {{ val.name[$i18n.locale] }}
                        <div class="new-tc" v-if="val.hasNew"></div>
                        <div class="feature-tc" v-if="val.hasFeatured"></div>
                      </div>
                    </div>
                  </v-tab>
                </v-tabs>-->
      </v-container>
    </v-card>
    <!--    <Location/>-->
    <ProductDetailV3 :productName="activeProductName" v-if="activeProductName" @ok="resetRoute"></ProductDetailV3>
    <div id="structured-data-categories"></div>
    <CreditRedemption ref="CreditRedemption"></CreditRedemption>
  </div>
</template>
<script>
import {mapMutations, mapState}                                     from "vuex"
import {mdiCrown, mdiDiamondStone, mdiFire, mdiMenuDown, mdiMenuUp} from "@mdi/js";
import moment                                                       from "moment";
import Cookies                                                      from 'js-cookie'

export default {
  head () {
    return {
      title : this.categoriesWithProducts.filter(item => item.name.en === this.tab)[0] ? this.categoriesWithProducts.filter(item => item.name.en === this.tab)[0].name.zh + ' Optmeal' : '',
    }
  },

  watch : {
    'activeProductName' : {
      handler (val) {
        if (val) {
          this.activeProductName = val
        }
      }
    },
    tab () {
      this.setStructuredData()
    }
  },

  computed : {
    ...mapState(['catDiscount', 'buyXGetYFree', 'alert', 'showTrial', 'user', 'topupCredits']),
    getGroupedCats () {
      const test = _.groupBy(this.categoriesWithProducts, 'categoryGroup.name.' + this.$i18n.locale)
      console.log(test)
      return test
    },
    getCatDiscount () {
      if (this.catDiscount && this.tab) {
        const cat = Object.values(this.catDiscount).filter(item => item.name.en === this.tab)[0]
        if (cat) {
          return cat.discount
        }
      }

      return []
    },

    getBuyXGetYFree () {
      if (this.buyXGetYFree && this.tab) {
        const cat = Object.values(this.buyXGetYFree).filter(item => item.name.en === this.tab)[0]
        if (cat) {
          return cat.buyXGetYFree
        }
      }

      return []
    },

    getTitle () {
      let title = ''
      if (this.categoriesWithProducts && this.categoriesWithProducts.length) {
        title = this.categoriesWithProducts.filter(item => item.name.en === this.tab)[0] ? this.categoriesWithProducts.filter(item => item.name.en === this.tab)[0].name.zh : ''
      }
      return title
    }
  },

  mounted () {
    const t = this
    setTimeout(function () {
      const tab = t.$route.path.replaceAll('/', '')
      t.tab = tab ? tab : 'Chilled'
    }, 600)
  },

  async created () {
    const showTrial = this.$route.query.showTrial
    if (showTrial) {
      //  show trial for 1 day
      Cookies.set('showTrial', 1, { expires : 1 })
    }

    const cookieShowTrial = Cookies.get('showTrial')
    if (cookieShowTrial) {
      this.enableTrial(true)
    }
    await this.dataConstruction()
    window.subTitle = ''

    if (this.$route.path.includes('product/')) {
      const split = this.$route.path.split('/')
      this.activeProductName = split[2]
    }
  },
  methods : {
    ...mapMutations(['setUser', 'setCatDiscount', 'enableTrial', 'toggleTopUpCreditsDialog']),
    async dataConstruction () {
      // categories
      const categoriesWithProducts = await this.$api.get('/v1/categories?products=1&status=published')
      if (categoriesWithProducts.data && categoriesWithProducts.data.results) {
        categoriesWithProducts.data.results.forEach((cat, index) => {
          cat.products = _.orderBy(cat.products, ['soldOut', 'featured', 'updatedAt'], ['asc', 'desc', 'desc'])
                          .filter(item => item.publish && !item.archive)

          const newProducts = cat.products.filter(item => item.publish && moment(item.createdAt).add(30, 'days')
                                                                                                .isAfter(moment()))
          if (newProducts.length) {
            cat.hasNew = true
          }

          const featuredProducts = cat.products.filter(item => item.publish && item.featured)
          if (featuredProducts.length) {
            cat.hasFeatured = true
          }
        })

        const showTrial = Cookies.get('showTrial')
        if (!showTrial) {
          categoriesWithProducts.data.results = categoriesWithProducts.data.results.filter(item => item.name.en !== 'Trial')
        }


        const catSort = []
        this.categoriesWithProducts = _.sortBy(categoriesWithProducts.data.results, item => {
          return catSort.indexOf(item.name.en)
        })
        // resort on 2024-11-09
        // const sort = ['Dimsum', 'Chicken', 'Box', 'Whey', 'Trial']
        // this.categoriesWithProducts = _.sortBy(categoriesWithProducts.data.results, function (item) {
        //   return sort.indexOf(item.name.en)
        // });
      }
      return true
    },
    resetRoute (cat) {
      this.activeProductName = null
      if (cat) {
        this.tab = cat
        this.$router.push('/' + cat)
      } else {
        this.$router.push('/')
      }
    },
    setStructuredData () {
      if (!this.tab || !this.categoriesWithProducts.length) return

      const category = this.categoriesWithProducts.filter(item => item.name.en === this.tab)[0]

      if (category) {
        const jsonldScript = document.createElement('script');
        const container = document.getElementById("structured-data-categories")
        jsonldScript.setAttribute('type', 'application/ld+json');

        const structuredData = {
          "@context"        : "https://schema.org/",
          "@type"           : "BreadcrumbList",
          "itemListElement" : []
        };
        let index = 0
        category.products.forEach(item => {
          index += 1
          structuredData.itemListElement.push({
            "@type"    : "ListItem",
            "position" : index + 1,
            "name"     : item.name.zh,
            "item"     : "https://myfridgehk.com/product/" + item.name.zh
          })
        })

        jsonldScript.textContent = JSON.stringify(structuredData);
        container.innerHTML = '';
        container.appendChild(jsonldScript)
      }
    },

    toCategory (category) {
      const cats = this.categoriesWithProducts.map((item) => item.name.en)
      this.tab = cats.includes(category) ? category : cats[0]
      this.$router.push(`/${ this.tab }`)

      window.scrollTo({
        // top      : window.innerWidth > 560 ? screen.height - 100 : 0,
        top      : window.innerWidth > 560 ? 0 : 0,
        behavior : "instant"
      })
    },

    toggleNavClass () {
      return 'sticky-nav'

      if (this.active == false) {
        return 'nav'
      } else {
        return 'sticky-nav'
      }
    }
  },
  data () {
    return {
      windowHeight           : window.innerHeight,
      trialPack              : null,
      loading                : true,
      CardList               : [],
      activeProductName      : null,
      tab                    : null,
      categoriesWithProducts : [],
      active                 : false,
      grouped                : {},
      icons                  : {
        mdiCrown,
        mdiFire,
        mdiDiamondStone,
        mdiMenuDown,
        mdiMenuUp
      }
    }
  }
}
</script>
