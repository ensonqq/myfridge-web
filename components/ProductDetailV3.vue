<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay scrollable persistent @keydown.esc="confirm">
    <v-card>
      <v-card-title class="position-relative">
        <template v-if="product">
          <div style="line-height: 1.1" :style="'max-width: ' + ((moment(product.createdAt).add(30, 'days').isAfter(moment()))? 'calc(100% - 30px); word-break: break-word;' : '100%;')">
            <span class="red--text text--darken-4 mr-1" v-if="product.featured"><span class="red--text text--darken-4 mr-1" v-if="product.featured">{{ $t('featured') }}<v-icon size="16" color="amber darken-3">{{ icons.mdiCreation }}</v-icon></span></span>{{ product.name[$i18n.locale] }}
          </div>
<!--          <div style="right: 8px; top: 10px; width: 45px; height: 45px;" v-if="moment(product.createdAt).add(30, 'days').isAfter(moment())" class="new-stamp detail shake"></div>-->
        </template>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-1">
        <v-container v-if="product">
          <!-- product detail tabs: reviews/description/etc..         -->
          <div>
            <v-tabs v-model="tab"
                    class="mb-8">
              <v-tab class="text-capitalize" href="#tab-1">{{ $t('productDetail') }}</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item value="tab-1">
                <v-row>
                  <v-col cols="12" xl="12">
                    <template v-if="product.images &&  product.images.length">
                      <v-img :key="'productImg'+index" v-for="(img,index) in product.images" class="ma-auto" max-width="100%" width="600px" :src="img.medium.path"></v-img>
                    </template>
                    <v-img v-else src="https://placehold.co/400"></v-img>
                  </v-col>
                  <v-col cols="12" xl="12">
                    <div class="text-center text-h4 font-weight-bold d-flex justify-center align-center">
                      {{ $t('unitPrice') }}：
                      <template v-if="user.vipTier === 'diamond'">
                        <v-icon class="purple--text text--lighten-1">{{ icons.mdiDiamondStone }}</v-icon>
                        <span class="primary--text f-600">${{ (product.discountPrice || product.price) - 1 }}</span>
                        <del>${{ product.discountPrice || product.price }}</del>
                      </template>
                      <template v-else-if="user.vipTier === 'gold'">
                        <v-icon class="amber--text text--accent-4">{{ icons.mdiCrown }}</v-icon>
                        <span class="primary--text f-600">${{ (product.discountPrice || product.price) - 1 }}</span>
                        <del>${{ product.discountPrice || product.price }}</del>
                      </template>
                      <template v-else>
                        <span v-if="product.discountPrice">
                            <span class="primary--text f-600">${{ product.discountPrice }}</span>
                            <del>${{ product.price }}</del>
                        </span>
                        <span v-else>
                          <span class="primary--text f-600">${{ product.price }}</span>
                        </span>
                      </template>
                    </div>
                    <!--
                    <NutritionTable :edibleMethods="product.edibleMethods" :edibleMethodsEn="product.edibleMethodsEn" :description="product.description" :ingredients="product.ingredients" :nutritionInfo="product.nutritionInfo"></NutritionTable>
                    -->
                    <div class="pt-4">
                      <div class="text-h6">{{ $t('productDesc') }}:</div>
                      <p>
                        {{ product.description[$i18n.locale] }}
                      </p>
                    </div>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-container>

      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions style="background-color: white" class="py-3">
        <v-spacer></v-spacer>
        <div v-if="product" style="background-color: rgba(198, 119, 60, 1); border-radius: 30px; padding: 0 5px;" class="d-flex align-center">
          <template v-if="!product.soldOut">
            <template v-if="getValueFromCart">
              <v-btn icon color="white" small outlined @click="customQuantity(-1, product.id, true)">
                <v-icon color="white">{{ icons.mdiMinus }}</v-icon>
              </v-btn>
              <v-text-field dark @submit.prevent :value="getValueFromCart" hide-details :disabled="!!(product.addons && product.addons.length)" @change="customQuantity($event, product.id)" single-line size="3" class="centered-input customized white--text py-2" type="number"></v-text-field>
              <v-btn icon color="white" small outlined @click="customQuantity(1, product.id, true)">
                <v-icon color="white">{{ icons.mdiPlus }}</v-icon>
              </v-btn>
            </template>
            <template v-else>
              <div class="py-1">
                <v-btn depressed small color="transparent white--text" @click="customQuantity(1, product.id, true)">
                  <v-icon size="18">{{ icons.mdiCartOutline }}</v-icon>
                  <b style="margin-left: -3px;">＋</b>
                </v-btn>
              </div>
            </template>
          </template>
          <v-btn v-else color="yellow darken-3" text dark>{{ $t('productionInProgress') }}</v-btn>
        </div>
        <v-btn text class="ml-5" @click="confirm">{{ $t('close') }}</v-btn>
      </v-card-actions>
    </v-card>
    <div id="structured-data-product"></div>
    <SelectAddons ref="SelectAddons"></SelectAddons>
  </v-dialog>
</template>
<script>
import {
  mdiStar,
  mdiThumbUpOutline,
  mdiCommentTextOutline,
  mdiCartPlus,
  mdiCrown,
  mdiCartOutline,
  mdiMinus, mdiPlus, mdiCreation, mdiDiamondStone
}                   from "@mdi/js"
import {mapState}   from "vuex";
import moment       from 'moment'
import _            from "lodash";
import SelectAddons from "@/components/SelectAddons";

export default {
  name  : 'ProductDetail',
  props : ['productName'],
  head () {
    return {
      title : (this.product ? this.product.name.zh : '') + '-產品詳情',
      meta  : [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid     : 'description',
          name    : 'description',
          content : 'My custom description'
        }
      ]
    }
  },
  mounted () {
    this.getProductDetail()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._backRoute = from.path
    })
  },
  data () {
    return {
      moment,
      dialog  : true,
      icons   : {
        mdiMinus,
        mdiPlus,
        mdiCartOutline,
        mdiStar,
        mdiCommentTextOutline,
        mdiThumbUpOutline,
        mdiCartPlus,
        mdiCrown,
        mdiCreation,
        mdiDiamondStone
      },
      tab     : null,
      product : null
    }
  },
  components : {
    SelectAddons
  },
  computed   : {
    ...mapState(['user', 'cart', 'categories']),
    getValueFromCart () {
      return this.cart.filter(item => item.product.id === this.product.id).map(item => item.quantity)
                 .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

  },
  methods    : {
    async customQuantity (event, itemId, byButton) {
      let addons = null
      if (this.product.addons && this.product.addons.length && event > 0) {
        const selectedAddonIndex = await this.$refs.SelectAddons.open(null, this.product.addons)
        if (selectedAddonIndex === null) return
        if (selectedAddonIndex !== -1) {
          addons = JSON.parse(JSON.stringify(this.product.addons[selectedAddonIndex]))
          delete addons._id
        }
      }

      if (!Number.isInteger(parseInt(event))) return;

      const pureCartItemToApi = this.cart.map(item => ({
        product : item.product.id, quantity : item.quantity, addons : item.addons
      }))

      let indexInCart = _.findIndex(this.cart, (item) => {
        if (addons && item.addons) {
          return item.product.id === itemId && addons.name.zh === item.addons.name.zh && addons.price === item.addons.price
        } else {
          return item.product.id === itemId
        }
      })


      // trial pack purchase limit: only 1
      if (indexInCart > -1 && this.cart[indexInCart].product.name.zh.indexOf('試食') > -1) {
        if (_.toInteger(event) > 0) {
          return this.pushSnackbarMessages(this.$t('trialPackLimitExceed'))
        }
      }

      // add item to cart api object
      if (indexInCart < 0) {
        if (addons) {
          indexInCart = pureCartItemToApi.push({ product : itemId, quantity : 0, addons }) - 1
        } else {
          indexInCart = pureCartItemToApi.push({ product : itemId, quantity : 0 }) - 1
        }
      }

      // by button click or set by input
      if (byButton) {
        pureCartItemToApi[indexInCart].quantity += _.toInteger(event)
      } else {
        pureCartItemToApi[indexInCart].quantity = _.toInteger(event)
      }

      // check if quantity is below 1, set to 0 by default
      if (pureCartItemToApi[indexInCart].quantity < 1) {
        pureCartItemToApi.splice(indexInCart, 1)
      }

      // return console.log(pureCartItemToApi)

      await this.$api.updateCart(pureCartItemToApi)

      // after cart array update in backend, initiate tracker
      if (indexInCart && pureCartItemToApi[indexInCart] && pureCartItemToApi[indexInCart].quantity > 0) {
        const product = this.cart[indexInCart]
        this.addToCartTracker(product)
      }
    },
    getCategoryDetail (catId) {
      return this.categories.filter(item => item.id === catId)[0]
    },
    addToCartTracker (item) {
      try {
        // facebook pixel tracker
        if (fbq) {
          fbq('track', 'AddToCart')
        }

        // google tag manager
        const category = this.getCategoryDetail(item.product.category)
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ ecommerce : null })
        window.dataLayer.push({
          event     : "add_to_cart",
          ecommerce : {
            currency : "HKD",
            value    : item.product.discountPrice || item.product.price,
            items    : [
              {
                item_id        : item.product.id,
                item_name      : item.product.name.zh,
                item_brand     : 'myfridge',
                item_category  : category.name.zh,
                item_category2 : category.name.en,
                price          : item.product.discountPrice || item.product.price,
                quantity       : item.quantity
              }
            ]
          }
        });
      } catch (error) {
        // wrapped
        console.log(error)
      }
    },
    setStructuredData () {
      if (this.product) {
        const jsonldScript = document.createElement('script');
        const container = document.getElementById("structured-data-product")
        jsonldScript.setAttribute('type', 'application/ld+json');

        const structuredData = {
          "@context"        : "https://schema.org/",
          "@type"           : "Product",
          "name"            : this.product.name.zh,
          "image"           : this.product.images[0] ? this.product.images[0].medium.path : 'https://myfridgehk.com/favicon.png',
          "description"     : this.product.name.zh + "，每日新鮮香港製造，無激素，無抗生素",
          "brand"           : {
            "@type" : "Brand",
            "name"  : "myfridge"
          },
          "sku"             : this.product.name.zh,
          "offers"          : {
            "@type"         : "AggregateOffer",
            "url"           : "https://myfridgehk.com/product/" + this.product.name.zh,
            "priceCurrency" : "HKD",
            "lowPrice"      : "20",
            "highPrice"     : "29",
            "offerCount"    : "100"
          },
          "aggregateRating" : {
            "@type"       : "AggregateRating",
            "ratingValue" : "4.9",
            "bestRating"  : "5",
            "worstRating" : "1",
            "ratingCount" : "188"
          }
        };

        jsonldScript.textContent = JSON.stringify(structuredData);
        container.innerHTML = '';
        container.appendChild(jsonldScript)
      }
    },
    async getProductDetail () {
      try {
        const product = await this.$api.get('/v1/products/name/' + this.productName)
        if (product.data) {
          this.product = product.data
          this.setStructuredData()
          this.viewProductDetailTracker()
        } else {
          this.confirm()
        }
      } catch (e) {
        console.log('in error')
        this.confirm()
      }
    },

    viewProductDetailTracker () {
      try {
        // google tag manager
        window.dataLayer = window.dataLayer || []
        dataLayer.push({ ecommerce : null });  // Clear the previous ecommerce object.
        dataLayer.push({
          event     : "view_item",
          ecommerce : {
            currency : "HKD",
            value    : this.product.discountPrice || this.product.price,
            items    : [
              {
                item_id        : this.product.id,
                item_name      : this.product.name.zh,
                item_brand     : "myfridge",
                item_category  : this.product.category.name.zh,
                item_category2 : this.product.category.name.en,
                price          : this.product.discountPrice || this.product.price,
                quantity       : 1
              }
            ]
          }
        });
      } catch (e) {
        // wrapped error
      }
    },
    confirm () {
      const cat = this.product && this.product.category ? this.product.category.name.en : null
      this.$emit('ok', cat)
    },
  },
}
</script>
<style lang="scss" scoped>
.nutrition-table {
  table {
    border-collapse: collapse;

    .nutrition-head {
      border-bottom: 2px solid black;
    }

    tr:nth-child(even) {
      td {
        border-bottom: 1px solid #ccc;
      }
    }
  }
}

.description {
  font-size: 20px;
}

.confirmBtn {
  position: fixed;
  font-weight: bold;
  bottom: 70px;
  right: 48px;
}

.addToCartBtn {
  position: fixed;
  font-weight: bold;
  bottom: 70px;
  right: 130px;
}

.bordered-title {
  border-left: 6px solid #101072;
  line-height: 100%;
  padding-left: 10px;
}

.food-menu-link {
  font-size: 14px;
  text-decoration: none;
  color: #4B566B !important;
  font-weight: 400;

  &:hover {
    color: #000 !important;
    border-right: 3px solid #D23F57;
  }

  &.active {
    color: #000 !important;
    border-right: 3px solid #D23F57;

  }
}
</style>
