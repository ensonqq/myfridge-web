<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay free @keydown.esc="confirm" @click:outside="confirm">
    <v-card style="padding-bottom: 150px !important">
      <v-card-title class="headline">
        <h1 class="text-center"></h1>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12" class="mt-4">
              <div class="d-flex justify-space-between flex-wrap align-center mb-3">
                <h1 class="me-2 text-40 bordered-title">香草味雞胸</h1>
              </div>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <v-img width="100%" height="100%" :src="require('~/assets/images/gallery/bigFood.png')"></v-img>
            </v-col>
            <v-col cols="12" xl="6" lg="6">
              <v-row dense>
                <v-col cols="6" xl="6">
                  <v-img contain :src="require('~/assets/images/gallery/foodOne.png')"></v-img>
                </v-col>
                <v-col cols="6" xl="6">
                  <v-img contain :src="require('~/assets/images/gallery/foodTwo.png')"></v-img>
                </v-col>
                <v-col cols="6" xl="6">
                  <v-img contain :src="require('~/assets/images/gallery/foodThree.png')"></v-img>
                </v-col>
                <v-col cols="6" xl="6">
                  <v-img contain :src="require('~/assets/images/gallery/foodFour.png')"></v-img>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="mt-4">
              <div class="d-flex justify-space-between flex-wrap align-center mb-3">
                <h1 class="me-2">香草味雞胸
                  <Spiciness :value=3></Spiciness>
                </h1>
              </div>
              <p class="mb-5 text-18">
                清新香草味，齊食或者拌沙拉吃一樣那麼好吃！
              </p>
            </v-col>
          </v-row>
          <!-- end::gallery  -->

          <!-- product detail tabs: reviews/description/etc..         -->
          <div>
            <v-tabs v-model="tab"
                    class="mb-8">
              <v-tab class="text-capitalize" href="#tab-1">{{ $t('productDetail') }}</v-tab>
              <v-tab class="text-capitalize" href="#tab-2">營養及成份</v-tab>
              <v-tab class="text-capitalize" href="#tab-3">顧客評價</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item value="tab-1">
                <v-row>
                  <v-col cols="12" xl="12">
                    <div class="description">
                      <h3>雞胸減肥秘訣4. 以不同食法減低厭倦感</h3>
                      <img src="https://www.cosmopolitan.com.hk/var/cosmopolitanhk/storage/images/cosmobody/instant-chicken-breast-for-diet/3.2/4292558-1-chi-HK/3.2_img_750_h.jpg"/>
                      <p>減肥的女生都要享受修身過程，餐餐食雞胸肉都會覺得悶，且減肥期間不能只吃一種肉類。她就3種雞肉種類的脂肪量分析，發現每100g雞胸肉有2.6g脂肪，雞翼佔3.5g，雞脾佔4.2g，其實脂肪含量分別不大。只要避開腸仔、排骨、午餐肉等高脂食材，減肥的女生也不必餐餐食雞胸肉。</p>
                      <img src="https://www.cosmopolitan.com.hk/var/cosmopolitanhk/storage/images/cosmobody/instant-chicken-breast-for-diet/3.2/4292558-1-chi-HK/3.2_img_750_h.jpg"/>
                      <p>成年女性每餐需要享用兩份肉類（80g生肉計），當中大約吸收14g蛋白質。如果您貪方便想買即食雞胸肉，可留意包裝上的每份份量再作決定。減肥或增肌中的女生可聽從營養師建議調整份量。</p>
                      <img src="https://www.cosmopolitan.com.hk/var/cosmopolitanhk/storage/images/cosmobody/instant-chicken-breast-for-diet/3.2/4292558-1-chi-HK/3.2_img_750_h.jpg"/>
                      <p>市面上的即食雞胸肉因口味選擇多，經醃製調味的即食雞胸肉鈉含量很易超標，相對新鮮雞胸肉不太健康。Cynthia指，每100g即食雞胸肉不宜超過150mg鈉，方為健康。所以想一日三餐都吃即食雞胸肉的話，就要慎選牌子，並且每日不能吸收超過2000mg鈉。</p>
                      另外有些牌子打着黑椒雞胸肉的旗號，細看成分卻有橄欖油，脂肪含量相對一般為高，女生可能會不留神，所以必須留意成分表。最後更要留意每款雞胸的食用份量為是否為100g，女生們需要慎選所需份量。
                    </div>
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
          <v-btn color="secondary" width="225" large @click="confirm" class="addToCartBtn">
            <v-icon color="white" small>{{ icons.mdiCartOutline }}</v-icon>
            加入購物車
          </v-btn>
          <v-btn color="primary darken-3s" large @click="confirm" class="confirmBtn">{{ $t('close') }}</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {mdiStar, mdiThumbUpOutline, mdiCommentTextOutline, mdiCartOutline} from "@mdi/js"

export default {
  name  : 'ProductDetail',
  props : ['productId'],
  head () {
    return {
      title : 'ProductDetail',
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
  data () {
    return {
      dialog : true,
      icons  : {
        mdiStar,
        mdiCommentTextOutline,
        mdiThumbUpOutline,
        mdiCartOutline,
      },
      // demo
      items           : [
        {
          text     : 'Home',
          disabled : false,
          href     : '/',
        },
        {
          text     : 'New York',
          disabled : false,
          href     : '/',
        },
        {
          text     : 'Resturants',
          disabled : true,
          href     : '/',
        },
      ],
      formSelectItems : ['Foo', 'Bar', 'Fizz', 'Buzz'],
      mobileItems     : [
        'Order Online', 'Book a Table', 'Reviews',
      ],
      text            : 'hello',
      tab             : null,
      checkbox        : true,
      radioGroup      : 1,
      value           : [20, 40],
    }
  },
  methods : {
    confirm () {
      this.$emit('ok')
    },
  },
}</script>
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
