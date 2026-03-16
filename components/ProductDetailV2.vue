<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay free @keydown.esc="confirm" @click:outside="confirm">
    <v-card style="padding-bottom: 150px !important">
      <v-card-text class="px-1">
        <v-container v-if="product">
          <v-row dense>
            <v-col cols="12" class="mt-4">
              <div class="d-flex justify-space-between flex-wrap align-center mb-3">
                <div class="col-11 position-relative mb-4 mt-4" v-if="moment(product.createdAt).add(30, 'days').isAfter(moment())">
                  <div class="new-stamp detail shake"></div>
                </div>
                <h1 class="me-2 text-20 bordered-title position-relative">{{ product.name.zh }}</h1>
              </div>
            </v-col>
          </v-row>
          <!-- end::gallery  -->

          <!-- product detail tabs: reviews/description/etc..         -->
          <div>
            <v-tabs v-model="tab"
                    class="mb-8">
              <v-tab class="text-capitalize" href="#tab-1">{{ $t('productDetail') }}</v-tab>
              <!--              <v-tab class="text-capitalize" href="#tab-2">營養及成份</v-tab>-->
              <!--              <v-tab class="text-capitalize" href="#tab-3">顧客評價</v-tab>-->
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item value="tab-1">
                <v-row>
                  <v-col cols="12" xl="12">
                    <v-img class="ma-auto" max-width="100%" width="600px" v-if="product.images && product.images[0]" :src="product.images[0].medium.path"></v-img>
                  </v-col>
                  <v-col cols="12" xl="12">
                    <div class="text-center text-18 font-weight-bold d-flex justify-center align-center">
                      {{ $t('unitPrice') }}：
                      <template v-if="user.vipTier === 'gold'">
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
                    <NutritionTable :description="product.description" :ingredients="product.ingredients" :nutritionInfo="product.nutritionInfo"></NutritionTable>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item value="tab-2">
                <v-row>
                  <v-col cols="12" lg="6">
                    <NutritionTable></NutritionTable>
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item value="tab-3">
                <v-row>
                  <v-col cols="12" lg="12">
                    <!-- user-post  -->
                    <div class="mb-6">
                      <div class="d-flex align-center flex-wrap mb-4">
                        <v-avatar size="48" class="me-4">
                          <img src="~/assets/images/faces/8.png" alt="">
                        </v-avatar>
                        <div>
                          <h5 class="mb-0">Abriella Bond</h5>
                          <p class="mb-0 text-18 grey--text text--darken-1">2 Reviews, 9 Followers</p>
                        </div>
                      </div>
                      <div class="d-flex align-center mb-2">
                                              <span v-for="(star, index) in 5"
                                                    :key="index">
                                                  <v-icon small color="warning">{{ icons.mdiStar }}</v-icon>
                                              </span>
                        <span class="font-weight-bold text-18 ms-2">4.0</span>
                        <span class="grey--text text--darken-1 text-18 ms-2">3 Days Ago</span>
                      </div>
                      <h5 class="grey--text text--darken-2 font-weight-regular mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.</h5>
                      <v-row class="mb-2">
                        <v-col cols="6" lg="6">
                          <v-img contain :src="require('~/assets/images/gallery/foodFive.png')"></v-img>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-img contain :src="require('~/assets/images/gallery/foodSix.png')"></v-img>
                        </v-col>
                      </v-row>
                      <div>
                        <span class="grey--text text--darken-1 text-18">4 Likes,  2 Comments</span>
                        <div class="mt-4">
                          <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small>
                            <v-icon left small>{{ icons.mdiThumbUpOutline }}</v-icon>
                            Like
                          </v-btn>
                          <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small>
                            <v-icon left small>{{ icons.mdiCommentTextOutline }}</v-icon>
                            Comment
                          </v-btn>
                        </div>
                      </div>
                      <v-divider class="my-4"></v-divider>
                      <!-- comment  -->
                      <div class="mb-6">
                        <div class="d-flex align-center mb-3">
                          <v-avatar size="28" class="me-3">
                            <img src="~/assets/images/faces/6.png" alt="">
                          </v-avatar>
                          <div class="text-18 grey--text text--darken-4 f-600">Emmet McDermott</div>
                        </div>
                        <h5 class="grey--text text--darken-2 font-weight-regular">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.</h5>
                      </div>
                      <div class="mb-6">
                        <div class="d-flex align-center mb-3">
                          <v-avatar size="28" class="me-3">
                            <img src="~/assets/images/faces/7.png" alt="">
                          </v-avatar>
                          <div class="text-18 grey--text text--darken-4 f-600">Emmet McDermott</div>
                        </div>
                        <h5 class="grey--text text--darken-2 font-weight-regular">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.</h5>
                      </div>
                      <v-divider></v-divider>
                      <!-- end::comment -->

                    </div>
                    <!-- end::user-post  -->
                    <!-- user-post  -->
                    <div class="mb-6">
                      <div class="d-flex align-center flex-wrap mb-4">
                        <v-avatar size="48" class="me-4">
                          <img src="~/assets/images/faces/13.jpg" alt="">
                        </v-avatar>
                        <div>
                          <h5 class="mb-0">Abriella Bond</h5>
                          <p class="mb-0 text-18 grey--text text--darken-1">2 Reviews, 9 Followers</p>
                        </div>
                      </div>
                      <div class="d-flex align-center mb-2">
                                              <span
                                                v-for="(star, index) in 5"
                                                :key="index"
                                              >
                                                  <v-icon small color="warning">{{ icons.mdiStar }}</v-icon>
                                              </span>
                        <span class="font-weight-bold text-18 ms-2">4.0</span>
                        <span class="grey--text text--darken-1 text-18 ms-2">3 Days Ago</span>
                      </div>
                      <h5 class="grey--text text--darken-2 font-weight-regular mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.</h5>

                      <div>
                        <span class="grey--text text--darken-1 text-18">4 Likes,  2 Comments</span>
                        <div class="mt-4">
                          <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small>
                            <v-icon left small>{{ icons.mdiThumbUpOutline }}</v-icon>
                            Like
                          </v-btn>
                          <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small>
                            <v-icon left small>{{ icons.mdiCommentTextOutline }}</v-icon>
                            Comment
                          </v-btn>
                        </div>
                      </div>
                      <v-divider class="my-4"></v-divider>


                    </div>
                    <!-- end::user-post  -->
                    <!-- user-post  -->
                    <div class="mb-6">
                      <div class="d-flex align-center flex-wrap mb-4">
                        <v-avatar size="48" class="me-4">
                          <img src="~/assets/images/faces/9.jpg" alt="">
                        </v-avatar>
                        <div>
                          <h5 class="mb-0">Abriella Bond</h5>
                          <p class="mb-0 text-18 grey--text text--darken-1">2 Reviews, 9 Followers</p>
                        </div>
                      </div>
                      <div class="d-flex align-center mb-2">
                                              <span
                                                v-for="(star, index) in 5"
                                                :key="index"
                                              >
                                                  <v-icon small color="warning">{{ icons.mdiStar }}</v-icon>
                                              </span>
                        <span class="font-weight-bold text-18 ms-2">4.0</span>
                        <span class="grey--text text--darken-1 text-18 ms-2">3 Days Ago</span>
                      </div>
                      <h5 class="grey--text text--darken-2 font-weight-regular mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.</h5>

                      <div>
                        <span class="grey--text text--darken-1 text-18">4 Likes,  2 Comments</span>
                        <div class="mt-4">
                          <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small>
                            <v-icon left small>{{ icons.mdiThumbUpOutline }}</v-icon>
                            Like
                          </v-btn>
                          <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small>
                            <v-icon left small>{{ icons.mdiCommentTextOutline }}</v-icon>
                            Comment
                          </v-btn>
                        </div>
                      </div>
                      <v-divider class="my-4"></v-divider>
                    </div>
                    <!-- end::user-post  -->
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-container>

      </v-card-text>
      <v-card-actions style="background-color: white">
        <v-spacer></v-spacer>
        <div>
          <AddToCartV2 @click.prevent :fixed="true" :soldOut="product? product.soldOut : false" :itemId="product?product.id: ''"></AddToCartV2>
          <v-btn color="primary darken-3 rounded-pill" @click="confirm" large class="confirmBtn">{{ $t('close') }}</v-btn>
        </div>
      </v-card-actions>
    </v-card>
    <div id="structured-data-product"></div>
  </v-dialog>
</template>
<script>
import {mdiStar, mdiThumbUpOutline, mdiCommentTextOutline, mdiCartPlus, mdiCrown} from "@mdi/js"
import {mapState}                                                                 from "vuex";
import moment                                                                     from 'moment'

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
  data () {
    return {
      moment,
      dialog  : true,
      icons   : {
        mdiStar,
        mdiCommentTextOutline,
        mdiThumbUpOutline,
        mdiCartPlus,
        mdiCrown
      },
      tab     : null,
      product : null
    }
  },
  computed : {
    ...mapState(['user'])
  },
  methods  : {
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
      this.$emit('ok')
      this.$router.go(-1)
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
