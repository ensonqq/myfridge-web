<template>
  <v-navigation-drawer width="750" v-model="shoppingCartDrawer" :stateless="!!(loginModal || snackbarMessages.length || loadingPayment || loadingConfirmation || prizeDrawer)" temporary fixed right id="shopping-cart" class="shopping-cart" @close="complete">
    <div class="d-flex justify-space-between align-center ps-4 pe-3 mt-3 mb-2 cart-header">
      <div class="d-flex align-center">
        <v-icon class="me-1">{{ icons.mdiShoppingOutline }}</v-icon>
        {{ $t('myCart') }}
      </div>
      <v-btn icon color="secondary" @click.stop="shoppingCartDrawer = !shoppingCartDrawer">{{ $t('close') }}</v-btn>
    </div>
    <v-stepper v-model="stepper" class="no-shadow">
      <v-stepper-items class="no-shadow">

        <v-stepper-content class="px-lg-5 px-md-5 px-2" step="1">
          <div class="navbar-scroll cart pb-250">
            <div class="d-flex align-center justify-space-between">
              <h3 class="pb-3">{{ $t('cart') }} HKD${{ getCheckOutSum() }}</h3>
              <div class="d-flex text-14 align-center cursor-pointer" @click="promptForClearCart()" v-if="cart.length">
                {{ $t('clear') }}
                <v-icon size="18">{{ icons.mdiTrashCanOutline }}</v-icon>
              </div>
            </div>
            <div v-for="(item, index) in cart"
                 class="cart-item py-1"
                 :key="index">
              <div class="d-flex align-center justify-space-between pa-1">
                <div class="d-flex align-center flex-1">
                  <!--                  here-->
                  <v-btn icon small class="ma-1" @click="removeItem(index)" style="margin-left: -5px !important;">
                    <v-icon small>{{ icons.mdiClose }}</v-icon>
                  </v-btn>
                  <v-avatar size="90" tile class="me-4">
                    <v-img v-if="item.product.images[0]" contain class="br-10" :src="item.product.images[0].small.path" alt=""></v-img>
                  </v-avatar>
                  <div>
                    <!--          name          -->
                    <div class="d-inline-block mb-0 f-600 text-lg-h6 text-md-h6 text-15">{{ item.product.name[$i18n.locale] }}</div>
                    <!--          quantity x price          -->
                    <p class="text-12 mb-0 d-flex align-center" v-if="user.vipTier === 'diamond'">
                      <span>{{ $t('unitPrice') }}: </span>
                      <del class="text-11 mr-1">${{ item.product.discountPrice || item.product.price }}</del>
                      <v-icon class="text-12 deep-purple--text text--lighten-1" small>{{ icons.mdiDiamondStone }}</v-icon>
                      ${{ (item.product.discountPrice || item.product.price) - 1 }}
                    </p>
                    <p class="text-12 mb-0 d-flex align-center" v-else-if="user.vipTier === 'gold'">
                      <span>{{ $t('unitPrice') }}: </span>
                      <del class="text-11 mr-1">${{ item.product.discountPrice || item.product.price }}</del>
                      <v-icon class="text-12 amber--text text--accent-4" small>{{ icons.mdiCrown }}</v-icon>
                      ${{ (item.product.discountPrice || item.product.price) - 1 }}
                    </p>
                    <p class="text-12 mb-0" v-else>
                      <span>{{ $t('unitPrice') }}: </span>${{ item.product.discountPrice || item.product.price }}
                    </p>

                    <p class="text-12 mb-0" v-if="item.addons">
                      <span>{{ $t('addon') }}: </span>{{ item.addons.name[$i18n.locale] }} ${{ item.addons.price }}</p>

                    <!--          price          -->
                    <h5 class="primary--text" v-if="user.vipTier === 'gold' || user.vipTier === 'diamond'">
                      ${{ (((item.product.discountPrice || item.product.price) - 1) + (item.addons ? item.addons.price : 0)) * item.quantity }}
                    </h5>
                    <h5 class="primary--text" v-else>
                      ${{ ((item.product.discountPrice || item.product.price) + (item.addons ? item.addons.price : 0)) * item.quantity }}
                    </h5>
                  </div>
                </div>
                <div class="text-center">
                  <template v-if="!item.product.publish || item.product.soldOut">
                    <v-chip color="grey lighten-2" text-color="red darken-3">{{ $t('productIsSoldOut') }}</v-chip>
                  </template>
                  <template v-else>
                    <v-btn icon color="secondary" x-small outlined @click="customQuantity(1, index, true)">
                      <v-icon>{{ icons.mdiPlus }}</v-icon>
                    </v-btn>
                    <v-text-field @submit.prevent hide-details :value="item.quantity" @change="customQuantity($event, index)" single-line size="3" class="centered-input customized py-0 my-2 px-2 px-lg-0"></v-text-field>
                    <v-btn icon color="secondary" x-small outlined @click="customQuantity(-1, index, true)">
                      <v-icon>{{ icons.mdiMinus }}</v-icon>
                    </v-btn>
                  </template>
                </div>
              </div>
            </div>

            <template>
              <div class="cart-item prize-in-cart bg-light-red" v-if="myPrize">
                <div class="d-flex align-center justify-space-between pa-1">
                  <div class="d-flex align-center w100p pa-3">
                    <div class="text-center mr-1" style="min-width: 40px">
                      <b class="red--text text--darken-4">{{ $t('redPacket') }}:</b>
                    </div>
                    <v-avatar size="60" tile class="mr-2">
                      <template v-if="myPrize.item.type === 'item'">
                        <v-img v-if="myPrize.item.product.images[0]" contain class="br-10" :src="myPrize.item.product.images[0].small.path" alt=""></v-img>
                      </template>
                      <template v-else>
                        <v-img contain class="br-10" :src="require('~/assets/images/fuk.png')" alt=""></v-img>
                      </template>
                    </v-avatar>
                    <div class="flex-fill">
                      <h5 class="d-inline-block mb-0 f-600">
                        <template v-if="myPrize.item.type === 'item'">
                          {{ myPrize.item.product.name[$i18n.locale] }} x{{ myPrize.item.amount }}{{ $t('pieces') }}
                        </template>
                        <template v-else>
                          ${{ myPrize.item.amount }}{{ $t('1xredPacket') }}
                        </template>
                      </h5>
                      <h5 class="red--text text--darken-4">
                        <template v-if="myPrize.item.type === 'item'">
                          {{ $t('freeGiftAfterPurchase') }}
                        </template>
                        <template v-else>
                          {{ $t('discountUponPurchase') }}
                        </template>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="!myPrize && prize">
                <div class="cart-item prize-in-cart bg-light-red">
                  <div class="d-flex align-center justify-space-between pa-1">
                    <div class="d-flex align-center w100p pa-3">
                      <v-avatar size="60" tile class="me-4 shake">
                        <v-img :src="prize.images[0].small.path"></v-img>
                      </v-avatar>
                      <div class="flex-fill">
                        <h5 class="d-inline-block mb-0 f-600">
                          {{ $t('youHave1RedPacket') }}
                        </h5>
                        <h5 class="primary--text cursor-pointer" @click="togglePrizeDrawer(true)">
                          {{ $t('openNow') }}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <div class="cart-item prize-in-cart bg-light-blue" v-if="gift">
              <div class="d-flex align-center justify-space-between pa-1">
                <div class="d-flex align-center w100p pa-3">
                  <v-avatar size="60" tile class="mr-3">
                    <template v-if="gift.item.type === 'item'">
                      <v-img v-if="gift.item.product.images[0]" contain class="br-10" :src="gift.item.product.images[0].small.path" alt=""></v-img>
                    </template>
                    <template v-else>
                      <v-img v-if="gift.images[0]" contain class="br-10" :src="gift.images[0].small.path" alt=""></v-img>
                    </template>
                  </v-avatar>
                  <div class="flex-fill">
                    <h5 class="d-inline-block mb-0 f-600">
                      <div class="d-flex align-start">
                        <v-icon class="mr-1">{{ icons.mdiGiftOutline }}</v-icon>
                        <b class="mr-1">
                          {{ $t('gift') }}:
                        </b>
                        <div>
                          <template v-if="gift.item.type === 'item'">
                            {{ gift.autoChecked ? $t('receiving') : $t('selectable') }} {{ gift.item.product.name[$i18n.locale] }} x{{ gift.item.amount }}{{ $t('pieces') }}
                          </template>
                          <template v-else>
                            {{ gift.autoChecked ? $t('receiving') : $t('selectable') }} {{ gift.name[$i18n.locale] }} x{{ gift.item.amount }}{{ $t('pieces') }}
                          </template>
                        </div>
                      </div>
                    </h5>
                    <h5 class="blue--text text--darken-4 text-14">
                      <div v-if="gift.rules.total > 0">*{{ $t('totalRequiredAfterDiscount') }}${{ gift.rules.total }}{{ (gift.rules.total > 0 && gift.rules.quantity > 0) ? $t('and') : '' }}</div>
                      <div v-if="gift.rules.quantity > 0">*{{ $t('quantityRequired', { value : gift.rules.quantity }) }}</div>
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <!--      empty cart      -->
            <template v-if="!cart.length">
              <p class="ma-0">- {{ $t('cartIsEmpty') }}</p>
            </template>

            <!--      below $100      -->
            <template v-if="getPureCartTotal < 300">
              <p class="ma-0">- {{ $t('minFreeDeliveryTotal') }}</p>
            </template>


            <div class="px-lg-4 px-1 py-1 discount-tier"
                 v-if="(hasCatDiscount && Object.keys(autoDiscountTiersAdopted).length)
                 || ['gold', 'diamond'].includes(user.vipTier)
                 || (hasCatBuyXGetYFree && Object.keys(autoBuyXGetYFreeAdopted).length)">
              <div class="pb-1 text-12">
                <v-icon class="text-12" small>{{ icons.mdiClipboardCheckMultipleOutline }}</v-icon>
                {{ $t('catTiersAtNext') }}
              </div>
              <template v-if="user.vipTier === 'gold' || user.vipTier === 'diamond'">
                <div class="py-1 flex-nowrap">
                  <v-progress-linear color="green lighten-1"
                                     height="18"
                                     value="100"
                                     class="black--text"
                                     stream>
                    <div class="d-flex justify-center align-center" style="font-size: 14px;">
                      <v-icon color="black" size="15">{{ icons.mdiCheckCircle }}</v-icon>
                      {{ user.vipTier === 'gold' ? $t('goldMemberDiscount') : $t('diamondMemberDiscount') }}
                    </div>
                  </v-progress-linear>
                </div>
              </template>

              <!-- CAT DISCOUNT TIER -->
              <div class="d-flex" v-for="(tier,catId) in autoDiscountTiersAdopted">
                <div :class="{'col-6': !!tier.nextTier.length, 'col-12': !tier.nextTier.length}" class="pb-1 flex-nowrap py-0 px-0" v-if="tier.completedTier" :key="catId">
                  <v-progress-linear color="green lighten-1"
                                     height="18"
                                     value="100"
                                     class="black--text"
                                     stream>
                    <div class="d-flex justify-center align-center" style="font-size: 14px;">
                      <v-icon color="black" size="15">{{ icons.mdiCheckCircle }}</v-icon>
                      {{ catDiscount[catId].name[$i18n.locale] }}:
                      {{
                        $t('catTiers', {
                          quantity : tier.completedTier.quantity, value : tier.completedTier.value * -1
                        })
                      }}
                      <!--                      (-${{ tier.completedTier.current * tier.completedTier.value * -1 }})-->
                    </div>
                  </v-progress-linear>
                </div>
                <div :class="{'col-12': !tier.completedTier, 'col-6': !!tier.completedTier}" class="pb-1 flex-nowrap py-0 px-0 position-relative" v-for="(nextIter,index) in tier.nextTier">
                  <v-progress-linear color="green lighten-4"
                                     style="border: 1px solid #c8e6c9;"
                                     height="18"
                                     :value="nextIter.current/nextIter.quantity*100"
                                     class="black--text"
                                     buffer-value="0">
                    <div class="d-flex justify-center align-center" style="font-size: 14px;">
                      {{ tier.completedTier ? '' : catDiscount[catId].name[$i18n.locale] + ':' }}
                      {{
                        $t('catTiers', {
                          quantity : nextIter.quantity, value : nextIter.value * -1
                        })
                      }}
                      <span class="">({{ nextIter.current }}/{{ nextIter.quantity }})</span>
                    </div>
                  </v-progress-linear>
                </div>
              </div>

              <!-- BUY X GET Y FREE -->
              <div class="d-flex flex-wrap" v-for="(tier,catId) in autoBuyXGetYFreeAdopted">
                <div :class="{'col-6': !!tier.nextTier.length, 'col-12': !tier.nextTier.length || $i18n.locale === 'en'}" class="pb-1 flex-nowrap py-0 px-0" v-if="tier.completedTier" :key="'_'+catId">
                  <v-progress-linear color="green lighten-1"
                                     height="18"
                                     value="100"
                                     class="black--text"
                                     stream>
                    <div class="d-flex justify-center align-center" style="font-size: 14px;">
                      <v-icon color="black" size="15">{{ icons.mdiCheckCircle }}</v-icon>
                      {{ buyXGetYFree[catId].name[$i18n.locale] }}:
                      {{
                        $t('buyXGetYFree', {
                          x : tier.completedTier.x, y : tier.completedTier.y
                        })
                      }} ({{ $t('free') }}{{ Math.floor(tier.completedTier.current / (tier.completedTier.x + tier.completedTier.y)) * tier.completedTier.y }}{{ $t('pieces') }}
                      <span v-if="!tier.nextTier.length" v-html="suggestBuyMore(tier)"></span>)
                    </div>
                  </v-progress-linear>
                </div>
                <div :class="{'col-12': !tier.completedTier || $i18n.locale === 'en', 'col-6': !!tier.completedTier}" class="pb-1 flex-nowrap py-0 px-0 position-relative" v-for="(nextIter,index) in tier.nextTier">
                  <v-progress-linear color="green lighten-4"
                                     style="border: 1px solid #c8e6c9;"
                                     height="18"
                                     :value="nextIter.current/(nextIter.x+nextIter.y)*100"
                                     class="black--text"
                                     buffer-value="0">
                    <div class="d-flex justify-center align-center" style="font-size: 14px;">
                      {{ tier.completedTier ? '' : buyXGetYFree[catId].name[$i18n.locale] + ':' }}
                      {{
                        $t('buyXGetYFree', {
                          x : nextIter.x, y : nextIter.y
                        })
                      }}
                      <span class="ml-1">({{ nextIter.current }}/{{ nextIter.x + nextIter.y }})</span>
                    </div>
                  </v-progress-linear>
                </div>
              </div>
            </div>
          </div>
        </v-stepper-content>

        <v-stepper-content class="px-lg-6 px-md-6 px-3" step="2">
          <div class="navbar-scroll cart">
            <div class="no-border mb-1">
              <h3>{{ $t('order') }}</h3>
              <span class="text-12">*{{ $t('deliveryReminder') }} <a :href="$t('sfCoverageUrl')" target="_blank">{{ $t('learnMore') }}</a></span>
            </div>
            <v-form @submit.prevent ref="orderForm" v-model="valid" lazy-validation>
              <!-- door to door or self pick up points -->

              <!--選購產品-->
              <v-row class="no-border mt-2">
                <v-col><h4 class="sub">1. {{ $t('shopItems') }}</h4></v-col>
              </v-row>
              <v-row class="pb-1-eee">
                <v-col cols="6" class="py-0 font-weight-bold text-13">{{ $t('product') }}</v-col>
                <v-col cols="2" class="py-0 font-weight-bold text-13 px-0">{{ $t('unitPrice') }}</v-col>
                <v-col cols="1" class="py-0 font-weight-bold text-13 px-0">{{ $t('quantity') }}</v-col>
                <v-col cols="3" class="py-0 font-weight-bold text-13 text-left">{{ $t('price') }}</v-col>
              </v-row>
              <v-row v-for="(item, index) in cart" v-if="item.product.publish && !item.product.soldOut" :key="index" class="item-table py-1 pb-1-eee">
                <!--        產品        -->
                <v-col cols="6" class="py-0">
                  {{ item.product.name[$i18n.locale] }}
                  <template v-if="item.addons">
                    <br><span class="text-14 ml-2">- {{ item.addons.name[$i18n.locale] }}</span>
                  </template>
                </v-col>
                <!--        單價        -->
                <v-col cols="2" class="py-0 px-0" v-if="user.vipTier === 'gold' || user.vipTier === 'diamond'">
                  <v-icon v-if="user.vipTier === 'gold'" class="text-12 amber--text text--accent-4" small>{{ icons.mdiCrown }}</v-icon>
                  <v-icon v-else class="text-12 deep-purple--text text--lighten-1" small>{{ icons.mdiDiamondStone }}</v-icon>
                  ${{ (item.product.discountPrice || item.product.price) - 1 }}
                  <del>${{ item.product.discountPrice || item.product.price }}</del>
                  <template v-if="item.addons">
                    <br><span>${{ item.addons.price }}</span>
                  </template>
                </v-col>
                <v-col cols="2" class="py-0 px-0" v-else>
                  ${{ item.product.discountPrice || item.product.price }}
                  <template v-if="item.addons">
                    <br><span>${{ item.addons.price }}</span>
                  </template>
                </v-col>
                <!--        數量        -->
                <v-col cols="1" class="py-0 px-0 d-flex align-center">x{{ item.quantity }}</v-col>
                <!--        HKD        -->
                <v-col cols="3" class="py-0 text-left d-flex align-center" v-if="user.vipTier === 'gold' || user.vipTier === 'diamond'">
                  ${{ item.quantity * (((item.product.discountPrice || item.product.price) - 1) + (item.addons ? item.addons.price : 0)) }}
                </v-col>
                <v-col cols="3" class="py-0 text-left d-flex align-center" v-else>${{ item.quantity * ((item.product.discountPrice || item.product.price) + (item.addons ? item.addons.price : 0)) }}</v-col>
              </v-row>

              <!--周末送貨+$10-->
              <v-row v-if="isWeekendDelivery" class="pb-1-eee">
                <v-col cols="9" class="py-0">*{{ $t('weekendDelivery') }}</v-col>
                <v-col cols="3" class="py-0">$10</v-col>
              </v-row>

              <!--小結-->
              <v-row>
                <v-col cols="9" class="font-weight-bold">{{ $t('subtotal') }}:</v-col>
                <v-col cols="3" class="text-left">${{ getTotal }}</v-col>
              </v-row>

              <v-divider class="mt-1"></v-divider>

              <!--優惠碼-->
              <v-row class="py-6 pt-8">
                <v-col cols="12" class="d-flex justify-space-between align-center pt-0 pb-6">
                  <div class="mr-1 font-weight-bold">
                    {{ $t('voucherCode') }}:
                  </div>
                  <div style="width: 135px;" class="mr-lg-16 mr-4">
                    <v-text-field class="discount-code-input" dense ref="voucherInput" :loading="loadingVoucher? 'secondary' : false" single-line outlined hide-details @input="validateVoucher($event)"></v-text-field>
                    <span class="p-absolute text-12 info--text">{{ voucherMessage }}</span>
                  </div>
                </v-col>
              </v-row>

              <v-divider v-if="user.credits"></v-divider>

              <!--使用積分-->
              <v-row v-if="user.credits" class="mt-3">
                <v-col cols="12" class="d-flex justify-space-between align-center pt-0 pb-6">
                  <div class="mr-1 font-weight-bold">{{ $t('useCredits') }}:</div>

                  <div>
                    <div style="width: 150px">
                      <v-switch hide-details style="display: inline-block" v-model="useCredits" v-if="user.credits > 0" color="orange darken-2"></v-switch>
                    </div>
                    <div class="text-12">{{ $t('use') }} {{ creditsCanBeUsed }} {{ $t('credits') }} (-${{ creditsCanBeUsed }})</div>
                    <template v-if="useCredits && creditsUsed && creditsCanBeUsed && user.credits - creditsUsed >= 0">
                      <div class="text-11">{{ $t('youHave') }} {{ user.credits }} {{ $t('credits') }} ({{ $t('remainingAfterUse') }}: {{ user.credits - creditsUsed }})</div>
                      <!--                <v-row class="justify-end my-0 py-0" style="margin-top: -5px !important;">-->
                      <!--                  <v-col cols="6 justify-end my-0 py-0" class="text-12 red&#45;&#45;text text&#45;&#45;darken-4">*{{ $t('useCreditsReminder') }}</v-col>-->
                      <!--                </v-row>-->
                    </template>
                  </div>
                </v-col>
              </v-row>

              <!--禮品-->
              <template v-if="gift">
                <v-row class="no-border pt-1-eee">
                  <v-col cols="12" class="font-weight-bold">{{ $t('gift') }} ({{ gift.autoChecked ? $t('auto') : $t('selectable') }}):</v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="py-1 flex-nowrap d-flex align-center">
                    <v-checkbox v-model="giftReqeusted"
                                class="ma-0"
                                color="secondary"
                                :disabled="getTotalWithOutBeforeCredit < gift.rules.total || getCheckOutQty < gift.rules.quantity"
                                :on-icon="icons.mdiCheckboxMarked"
                                :off-icon="icons.mdiCheckboxBlankOutline"
                                hide-details>
                      <template v-slot:label>
                        <v-avatar size="25" tile class="mr-1">
                          <template v-if="gift.item.type === 'item'">
                            <v-img v-if="gift.item.product.images[0]" contain class="br-10" :src="gift.item.product.images[0].small.path" alt=""></v-img>
                          </template>
                          <template v-else>
                            <v-img v-if="gift.images[0]" contain class="br-10" :src="gift.images[0].small.path" alt=""></v-img>
                          </template>
                        </v-avatar>
                        <div :class="{'black--text': getTotalWithOutBeforeCredit >= gift.rules.total && getCheckOutQty >= gift.rules.quantity }">
                          <template v-if="gift.item.type === 'item'">
                            {{ gift.item.product.name[$i18n.locale] }} x{{ gift.item.amount }}{{ $t('pieces') }}
                          </template>
                          <template v-else>
                            {{ gift.name[$i18n.locale] }} x{{ gift.item.amount }}{{ $t('pieces') }}
                          </template>
                          <template v-if="giftReqeusted">({{ $t('selected') }})</template>
                          <div class="text-12 red--text text--darken-3" v-if="getTotalWithOutBeforeCredit < gift.rules.total">
                            *{{ $t('totalRequiredAfterDiscount') }}${{ gift.rules.total }}{{ (getTotalWithOutBeforeCredit < gift.rules.total && getCheckOutQty < gift.rules.quantity) ? $t('and') : '' }}
                          </div>
                          <div class="text-12 red--text text--darken-3" v-if="getCheckOutQty < gift.rules.quantity">*{{ $t('quantityRequired', { value : gift.rules.quantity }) }}</div>
                        </div>
                      </template>
                    </v-checkbox>
                  </v-col>
                  <v-col cols="3" class="py-1">
                    <template v-if="gift.item.type === 'cash'">
                      -${{ gift.item.amount }}
                    </template>
                  </v-col>
                </v-row>
              </template>

              <!--抽獎-->
              <template v-if="myPrize && myPrize.item">
                <v-row class="pt-1-eee">
                  <v-col cols="12" class="font-weight-bold">{{ $t('receivedRedPacket') }}:</v-col>
                </v-row>
                <v-row>
                  <v-col cols="9" class="py-1 flex-nowrap d-flex align-center">
                    <v-avatar size="25" tile class="mr-1">
                      <v-img class="br-10" :src="require('assets/images/fuk.png')" alt=""></v-img>
                    </v-avatar>
                    <div>
                      <template v-if="myPrize.item.type === 'cash'">
                        ${{ myPrize.item.amount }}{{ $t('1xredPacket') }}
                      </template>
                      <template v-else>
                        {{ myPrize.item.product.name[$i18n.locale] }} x1{{ $t('pieces') }}
                      </template>
                    </div>
                  </v-col>
                  <v-col cols="3" class="py-1">
                    <template v-if="myPrize.item.type === 'cash'">
                      -${{ myPrize.item.amount }}
                    </template>
                  </v-col>
                </v-row>
              </template>

              <!--優惠-->
              <template v-if="getCatDiscountTotal || getVoucherDiscountTotal || user.vipTier === 'gold' || user.vipTier === 'diamond' || creditsUsed || myPrize">
                <v-row class="pt-1-eee">
                  <v-col cols="12" class="font-weight-bold">{{ $t('discount') }}:</v-col>
                </v-row>
                <!--黃金會員-->
                <v-row v-if="user.vipTier === 'gold'">
                  <v-col cols="12" class="py-0 pb-1 flex-nowrap text-14">
                    <v-icon class="text-12 amber--text text--accent-4">{{ icons.mdiCrown }}</v-icon>
                    {{ $t('goldMemberDiscount') }}
                  </v-col>
                </v-row>
                <!--鑽石會員-->
                <v-row v-if="user.vipTier === 'diamond'">
                  <v-col cols="12" class="py-0 pb-1 flex-nowrap text-14">
                    <v-icon class="text-12 deep-purple--text text--lpushSnackbarMessages">{{ icons.mdiDiamondStone }}</v-icon>
                    {{ $t('diamondMemberDiscount') }}
                  </v-col>
                  <v-col cols="12" class="py-0 pb-1 flex-nowrap text-14">
                    <v-icon class="text-12 deep-purple--text text--lpushSnackbarMessages">{{ icons.mdiDiamondStone }}</v-icon>
                    {{ $t('diamondMemberX3credits') }}
                  </v-col>
                </v-row>

                <!--多買多平 cat discount tier-->
                <v-row v-if="tier.completedTier" :key="catId" v-for="(tier,catId) in autoDiscountTiersAdopted">
                  <v-col cols="9" class="py-0 pb-1 flex-nowrap text-14" v-if="tier.completedTier">
                    <v-icon color="green darken-4">{{ icons.mdiCheckCircle }}</v-icon>
                    {{ catDiscount[catId].name[$i18n.locale] }}：{{
                      $t('catTiers', {
                        quantity : tier.completedTier.quantity, value : tier.completedTier.value * -1
                      })
                    }} ({{ $t('minus') }}{{ tier.completedTier.current }}{{ $t('pieces') }})
                  </v-col>
                  <v-col cols="3" class="py-0 pb-1 text-14">-${{ tier.completedTier.value * -1 * tier.completedTier.current }}</v-col>
                </v-row>

                <!--多買多送 買X送Y Buy X get Y free cat buy more get more -->
                <v-row v-if="tier.completedTier" :key="'_'+catId" v-for="(tier,catId) in autoBuyXGetYFreeAdopted">
                  <v-col cols="9" class="py-0 pb-1 flex-nowrap text-14" v-if="tier.completedTier">
                    <v-icon color="green darken-4">{{ icons.mdiCheckCircle }}</v-icon>
                    {{ buyXGetYFree[catId].name[$i18n.locale] }}：{{
                      $t('buyXGetYFree', {
                        x : tier.completedTier.x, y : tier.completedTier.y
                      })
                    }} ({{ $t('free') }}{{ Math.floor(tier.completedTier.current / (tier.completedTier.x + tier.completedTier.y)) * tier.completedTier.y }}{{ $t('pieces') }})
                  </v-col>
                  <v-col cols="3" class="py-0 pb-1 text-14">-${{ getBuyXGetYFreeDiscount(tier.completedTier, catId) * -1 }}</v-col>
                </v-row>

                <!--積分使用-->
                <v-row v-if="creditsUsed && creditsCanBeUsed">
                  <v-col cols="9" class="py-0 pb-1 flex-nowrap text-14">
                    <v-icon color="green darken-4">{{ icons.mdiCheckCircle }}</v-icon>
                    {{ $t('using') }} {{ creditsUsed }} {{ $t('memberCredits') }}
                  </v-col>
                  <v-col cols="3" class="py-0 pb-1 text-14">-${{ creditsUsed }}</v-col>
                </v-row>

                <!--優惠碼使用-->
                <v-row v-if="voucher">
                  <v-col cols="9" class="py-0 pb-1 flex-nowrap text-14">
                    <v-icon color="green darken-4">{{ icons.mdiCheckCircle }}</v-icon>
                    {{ $t('voucherCode') }}: {{ voucher.code }} ({{ voucher.name[$i18n.locale] }})
                  </v-col>
                  <v-col cols="3" class="py-0 pb-1 text-14">-${{ getVoucherDiscountTotal * -1 }}</v-col>
                </v-row>
              </template>

              <!--總數 paid total-->
              <v-row class="text-18 pt-1-eee">
                <v-col cols="9" class="font-weight-bold pb-0">{{ $t('total') }}:</v-col>
                <v-col cols="3" class="text-left font-weight-bold pb-0">
                  ${{ getPaidTotal }}<br>
                </v-col>
              </v-row>
              <v-row class="mt-0 pt-0 text-12">
                <v-col cols="9" class="text-right">
                  <v-btn width="200" v-if="!user.id" class="my-1 px-0" color="secondary" @click="loginAndContinueShopping()">
                    <span v-html="$t('loginOrRegToGetCreditsHTML')"></span>
                  </v-btn>
                </v-col>
                <v-col cols="3" class="text-14">
                  <!--                  <div class="text-12" v-if="user.vipTier === 'diamond'">*{{ $t('creditsGained') }}({{ $t('x3credits') }}): {{ Math.floor(getPaidTotal * 3 / 100) }}</div>-->
                  <div class="text-12">{{ $t('creditsGained') }}: {{ Math.floor(getPaidTotal / 100) }}</div>
                  <div class="text-11">*{{ $t('memberObtainCreditMsg') }}</div>
                </v-col>
                <v-col cols="12" class="py-0">
                  <div class="text-11 text-center">
                  </div>
                </v-col>
              </v-row>

              <v-divider class="my-6"></v-divider>

              <v-row>
                <v-col class="py-0 mt-6">
                  <h4 class="sub">2. {{ $t('deliveryDate') }}</h4>
                </v-col>
              </v-row>
              <v-row class="no-border flex-wrap">
                <v-col cols="12" md="6" lg="6" class="d-flex align-center">
                  <!--                <v-col cols="12" md="12" lg="12" class="d-flex align-center">-->
                  <div class="pr-2">{{ $t('date') }}:</div>
                  <v-menu ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          max-width="290"
                          offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense :value="displayDeliveryDayFormat" :rules="[$validations.required]" readonly single-line outlined hide-details v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="deliveryDay"
                                   :next-icon="icons.mdiChevronRight"
                                   :prev-icon="icons.mdiChevronLeft"
                                   no-title
                                   :locale="$i18n.locale === 'zh'? 'zh-HK' : undefined"
                                   :allowed-dates="allowDates"
                                   @input="menu1 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <!--                <v-col cols="12" md="6" lg="6" class="d-flex align-center">
                                  <div class="pr-2">{{ $t('timeSlot') }}:</div>
                                  <v-select :items="getTimeSlot"
                                            v-model="deliveryTimeSlot"
                                            dense
                                            hidden
                                            :no-data-text="$t('deliveryAddressPrompt')"
                                            :rules="[$validations.required]"
                                            single-line outlined hide-details></v-select>
                                </v-col>-->
                <!--                <v-col v-if="isWeekendDelivery" cols="12" class="text-12 text-right weekend-delivery px-4">*{{ $t('weekendDelivery') }}+$10</v-col>-->
                <v-col v-if="isWeekendDelivery" cols="6" class="text-12 text-left px-4 d-flex align-center">*{{ $t('weekendDelivery') }}+$10</v-col>
              </v-row>


              <v-divider class="my-6"></v-divider>
              <v-row class="no-border ">
                <v-col class="pb-0"><h4 class="mt-6 sub pb-0">3. {{ $t('deliveryMethod') }}</h4></v-col>
              </v-row>
              <v-radio-group v-model="deliveryType" class="col-12" :rules="[$validations.required]" hide-details>
                <v-row class="pt-3 no-border">
                  <v-col md="6" cols="12" class="align-center d-flex cursor-pointer pa-0" @click="deliveryType = 'delivery'">
                    <v-col cols="2">
                      <v-radio :on-icon="icons.mdiRadioboxMarked"
                               color="secondary"
                               value="delivery"
                               class="ma-0"
                               :off-icon="icons.mdiRadioboxBlank"></v-radio>
                    </v-col>
                    <v-col cols="10" class="d-flex align-center pa-0">
                      <v-icon class="mr-1" size="20">{{ icons.mdiTruckFast }}</v-icon>
                      {{ $t('delivery') }}
                    </v-col>
                  </v-col>
                  <v-col md="6" cols="12" class="align-center d-flex cursor-pointer pa-0" @click="deliveryType = 'pickup'">
                    <v-col cols="2">
                      <v-radio :on-icon="icons.mdiRadioboxMarked"
                               color="secondary"
                               value="pickup"
                               class="ma-0"
                               :off-icon="icons.mdiRadioboxBlank"></v-radio>
                    </v-col>
                    <v-col cols="10" class="d-flex align-center pa-0 position-relative">
                      <v-icon class="mr-1" size="20">{{ icons.mdiStore }}</v-icon>
                      {{ $t('pickup') }} ({{ $t('sfExpressPickupPoint') }})
                    </v-col>
                  </v-col>
                </v-row>
              </v-radio-group>
              <!-- delivery Address -->
              <v-divider class="my-6"></v-divider>

              <v-row class="">
                <v-col class="pb-0">
                  <h4 class="mt-6 sub pb-0">4. {{ $t(deliveryType) }}</h4>
                </v-col>
              </v-row>
              <v-row class="pt-0 no-border">
                <v-col cols="12" class="d-flex flex-column justify-center align-start" v-if="deliveryType === 'delivery'">
                  <v-radio-group v-model="selectedAddressIndex" column class="col-12 address-radios" :rules="[$validations.required]" hide-details>
                    <v-row class="align-center cursor-pointer" v-for="(address, index) in user.addresses" @click="selectedAddressIndex = index" :key="'delivery'+index">
                      <v-col cols="1">
                        <v-radio :on-icon="icons.mdiRadioboxMarked"
                                 color="secondary"
                                 :value="index"
                                 class="ma-0"
                                 :off-icon="icons.mdiRadioboxBlank"></v-radio>
                      </v-col>
                      <v-col cols="9" class="text-break">
                        {{ $t(address.area) }}, {{ $t(address.district) }}, {{ $t(address.subDistrict) }}, {{ address.fullAddress }} ({{ $t('receiver') }}: {{ address.recipient }}, {{ address.phone }})
                      </v-col>
                      <v-col cols="2">
                        <v-btn @click="openAddress(index)" icon>
                          <v-icon>{{ icons.mdiPencilOutline }}</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                  <v-btn @click="openAddress()" depressed color="secondary" class="ma-auto mt-6">
                    <v-icon>{{ icons.mdiPlus }}</v-icon>
                    {{ $t('newAddress') }}
                  </v-btn>
                </v-col>

                <v-col cols="12" class="d-flex flex-column justify-center align-start" v-if="deliveryType === 'pickup'">
                  <v-radio-group v-model="selectedAddressIndex" column class="col-12 address-radios" :rules="[$validations.required]" hide-details>
                    <v-row class="align-center cursor-pointer" v-for="(address, index) in user.pickupAddresses" @click="selectedAddressIndex = index" :key="'pickup'+index">
                      <v-col cols="1">
                        <v-radio :on-icon="icons.mdiRadioboxMarked"
                                 color="secondary"
                                 :value="index"
                                 class="ma-0"
                                 :off-icon="icons.mdiRadioboxBlank"></v-radio>
                      </v-col>
                      <v-col cols="9" class="text-break">
                        <span>{{ $t('pickup') }}:</span> {{ address.fullAddress }} ({{ $t('receiver') }}: {{ address.recipient }}, {{ address.phone }})
                      </v-col>
                      <v-col cols="2">
                        <v-btn @click="openPickupAddress(index)" icon>
                          <v-icon>{{ icons.mdiPencilOutline }}</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                  <v-btn @click="openPickupAddress()" depressed color="secondary" class="ma-auto mt-3">
                    <v-icon>{{ icons.mdiPlus }}</v-icon>
                    {{ $t('newSelfPickUpAddress') }}
                  </v-btn>
                </v-col>
                <v-col cols="12" v-if="!deliveryType" class="error--text">
                  *{{ $t('pleaseSelectDeliveryMethodMsg') }}
                </v-col>
              </v-row>

              <!--non member receipt email-->
              <v-divider class="my-6"></v-divider>
              <v-row class="no-border ">
                <v-col><h4 class="mt-6 sub">5. {{ $t('emailWithDesc') }}</h4></v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field v-model="email" :rules="[$validations.required, $validations.email]" single-line outlined hide-details></v-text-field>
                </v-col>
              </v-row>

              <v-divider class="my-6"></v-divider>
              <v-row class="no-border ">
                <v-col><h4 class="mt-6 sub">6. {{ $t('paymentMethod') }}</h4></v-col>
                <v-col cols="12" class="red--text text--darken-4 text-12 pt-0 mt-0">*{{ $t('paymentSucessMsg') }}</v-col>
              </v-row>
              <v-row class="pt-0 no-border pb-16">
                <v-col cols="12" class="d-flex flex-column justify-center align-start pa-0">
                  <v-radio-group class="col-12" v-model="payment.paymentType" column :rules="[$validations.required]" hide-details>
                    <v-row class="align-center pb-1-eee" @click="payment.paymentType = 'stripe'">
                      <v-col cols="1">
                        <v-radio :on-icon="icons.mdiRadioboxMarked"
                                 color="secondary"
                                 value="stripe"
                                 class="ma-0"
                                 :off-icon="icons.mdiRadioboxBlank"></v-radio>
                      </v-col>
                      <v-col cols="11" class="d-flex align-center pa-0">
                        <v-col cols="5">
                          {{ $t('card&wallet') }}
                        </v-col>
                        <v-col cols="7" class="d-flex align-start flex-wrap">
                          <v-img class="mr-1 mb-1" max-width="39" contain :src="require('~/assets/images/payment_icons/visa.png')"></v-img>
                          <v-img class="mr-1" max-width="39" contain :src="require('~/assets/images/payment_icons/master.png')"></v-img>
                          <v-img class="mr-1" max-width="39" contain :src="require('~/assets/images/payment_icons/americanexpress.png')"></v-img>
                          <v-img class="mr-1" max-width="39" contain :src="require('~/assets/images/payment_icons/unoinpay_icon.png')"></v-img>
                          <v-img class="mr-1" max-width="39" contain :src="require('~/assets/images/payment_icons/jcb_icon.png')"></v-img>
                          <v-img class="mr-1 br-5" v-if="walletsAvailability.applePay" max-width="39" contain :src="require('~/assets/images/payment_icons/applepay.png')"></v-img>
                          <v-img class="mr-1 br-5" v-if="walletsAvailability.googlePay" max-width="39" contain :src="require('~/assets/images/payment_icons/googlepay.png')"></v-img>
                        </v-col>
                      </v-col>
                    </v-row>
                    <v-row class="align-center pb-1-eee" @click="payment.paymentType = 'paypal'">
                      <v-col cols="1">
                        <v-radio :on-icon="icons.mdiRadioboxMarked"
                                 color="secondary"
                                 value="paypal"
                                 class="ma-0"
                                 :off-icon="icons.mdiRadioboxBlank"></v-radio>
                      </v-col>
                      <v-col cols="11" class="d-flex align-center pa-0">
                        <v-col cols="5">
                          Paypal
                        </v-col>
                        <v-col cols="7" class="d-flex align-center">
                          <v-img max-width="45" contain :src="require('~/assets/images/payment_icons/paypal.png')"></v-img>
                        </v-col>
                      </v-col>
                    </v-row>
                    <v-row class="align-center pb-1-eee" @click="payment.paymentType = 'payme'">
                      <v-col cols="1">
                        <v-radio :on-icon="icons.mdiRadioboxMarked"
                                 color="secondary"
                                 value="payme"
                                 class="ma-0"
                                 :off-icon="icons.mdiRadioboxBlank"></v-radio>
                      </v-col>
                      <v-col cols="11" class="d-flex align-center pa-0">
                        <v-col cols="5">
                          Payme
                        </v-col>
                        <v-col cols="7" class="d-flex align-center">
                          <v-img max-width="45" contain :src="require('assets/images/payment_icons/payme.png')"></v-img>
                        </v-col>
                        <!--                        <v-col cols="12" class="red&#45;&#45;text text&#45;&#45;darken-4 text-12 pt-0 mt-0">如成功付款後不能返回訂單，稍等5分鐘便會自動確認，「電郵收據」及「我的訂單」將會見到紀錄</v-col>-->
                      </v-col>
                    </v-row>
                    <v-row class="align-center pb-1-eee" @click="payment.paymentType = 'alipay'">
                      <v-col cols="1">
                        <v-radio :on-icon="icons.mdiRadioboxMarked"
                                 color="secondary"
                                 value="alipay"
                                 class="ma-0"
                                 :off-icon="icons.mdiRadioboxBlank"></v-radio>
                      </v-col>
                      <v-col cols="11" class="d-flex align-center pa-0">
                        <v-col cols="5">
                          {{ $t('alipayhk') }}
                        </v-col>
                        <v-col cols="7" class="d-flex align-center">
                          <v-img max-width="45" contain :src="require('assets/images/payment_icons/alipay.png')"></v-img>
                        </v-col>
                      </v-col>
                    </v-row>
                    <v-row class="align-center pb-1-eee" @click="payment.paymentType = 'wechatpay'">
                      <v-col cols="1">
                        <v-radio :on-icon="icons.mdiRadioboxMarked"
                                 color="secondary"
                                 value="wechatpay"
                                 class="ma-0"
                                 :off-icon="icons.mdiRadioboxBlank"></v-radio>
                      </v-col>
                      <v-col cols="11" class="d-flex align-center pa-0">
                        <v-col cols="5">
                          {{ $t('wechatpayhk') }}
                        </v-col>
                        <v-col cols="7" class="d-flex align-center">
                          <v-img max-width="45" contain :src="require('assets/images/payment_icons/wechatpay.png')"></v-img>
                        </v-col>
                      </v-col>
                    </v-row>
                    <!--
                                        <v-row class="align-center pb-1-eee" @click="payment.paymentType = 'fps'">
                                          <v-col cols="1">
                                            <v-radio :on-icon="icons.mdiRadioboxMarked"
                                                     color="secondary"
                                                     value="fps"
                                                     class="ma-0"
                                                     :off-icon="icons.mdiRadioboxBlank"></v-radio>
                                          </v-col>
                                          <v-col cols="11" class="d-flex align-center pa-0">
                                            <v-col cols="5">
                                              {{ $t('fps') }}
                                            </v-col>
                                            <v-col cols="7" class="d-flex align-center">
                                              <v-img max-width="45" contain :src="require('assets/images/payment_icons/fps.png')"></v-img>
                                            </v-col>
                                          </v-col>
                                        </v-row>
                    -->
                    <v-row class="align-center" @click="payment.paymentType = 'octopus'">
                      <v-col cols="1">
                        <v-radio :on-icon="icons.mdiRadioboxMarked"
                                 color="secondary"
                                 value="octopus"
                                 class="ma-0"
                                 :off-icon="icons.mdiRadioboxBlank"></v-radio>
                      </v-col>
                      <v-col cols="11" class="d-flex align-center pa-0">
                        <v-col cols="5">
                          {{ $t('octupus') }}
                        </v-col>
                        <v-col cols="7" class="d-flex align-center">
                          <v-img max-width="45" contain :src="require('assets/images/payment_icons/octopus_1.png')"></v-img>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </v-stepper-content>

        <v-stepper-content class="px-lg-6 px-md-6 px-3" step="3">
          <div class="navbar-scroll">
            <h3 class="mb-6">{{ $t('payment') }}：HKD${{ getPaidTotal }}<br>
              <span class="text-12 green--text text--darken-4 font-weight-light" style="line-height: 12px;">
                <v-icon color="green darken-4">{{ icons.mdiShieldCheck }}</v-icon>
                *{{ $t('securePaymentMsg') }}
              </span>
            </h3>
            <v-row class="pt-0 no-border" v-show="order && order.payment.paymentType === 'stripe'">
              <Stripe ref="Stripe"></Stripe>
            </v-row>
            <v-row class="pt-0 no-border" v-show="order && order.payment.paymentType === 'paypal'">
              <v-col cols="12" class="font-weight-bold">{{ $t('redirectingToPaypal') }}．．．</v-col>
            </v-row>
          </div>
        </v-stepper-content>


        <v-stepper-content class="px-lg-6 px-md-6 px-3" step="4">
          <div class="navbar-scroll" v-if="order">
            <h3 class="mb-6">{{ $t('orderStatus') }}</h3>
            <template v-if="order.payment.paymentStatus === 'completed'">
              <v-row class="pt-0 no-border">
                <v-col cols="12" class="text-18 font-weight-bold">
                  <v-icon color="green" class="darken-2">{{ icons.mdiCheck }}</v-icon>
                  {{ $t('paymentReceived') }}：{{ order.paidTotal }}
                </v-col>
                <v-col cols="12">{{ $t('yourOrderIdIs') }}：{{ order.orderNumber }}。</v-col>
                <v-col cols="12">{{ $t('receiptSent') }}：{{ order.email }}。</v-col>
              </v-row>
            </template>

            <template v-else>
              <v-row class="pt-0 no-border">
                <v-col cols="12" class="text-18 font-weight-bold">
                  <v-icon color="red" class="darken-2">{{ icons.mdiClose }}</v-icon>
                  {{ $t('paymentFailureOrderNumber') }} {{ order.orderNumber }}。
                </v-col>
                <v-col cols="12">{{ $t('orderFailedReminder') }}</v-col>
                <v-col cols="12">{{ $t('contactUsIfYouHaveQuestion') }}</v-col>
              </v-row>
            </template>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <template v-slot:append>
      <div class="pa-1">
        <v-stepper v-model="stepper">
          <v-stepper-header color="secondary">
            <v-stepper-step :complete="stepper > 1"
                            step="1"
                            class="pb-1"
                            :completeIcon="icons.mdiCheck">
              <v-badge color="secondary"
                       v-if="getCheckOutQty"
                       :content="getCheckOutQty">{{ $t('cart') }}
                <v-icon size="18">{{ icons.mdiCartOutline }}</v-icon>
              </v-badge>
              <template v-else>
                {{ $t('cart') }}
              </template>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="stepper > 2"
                            step="2"
                            class="pb-1"
                            :completeIcon="icons.mdiCheck">{{ $t('order') }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="stepper > 3"
                            step="3"
                            class="pb-1"
                            :completeIcon="icons.mdiCheck">{{ $t('payment') }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4"
                            class="pb-1"
                            :completeIcon="icons.mdiCheck">{{ $t('status') }}
            </v-stepper-step>

            <v-col cols="12" class="d-flex justify-space-between py-0 px-0">
              <!--step 1-->
              <template v-if="stepper === 1 && user.id">
                <v-col>
                  <v-btn class="mb-3" block color="secondary" @click="stepper=2" :disabled="!cart.length || getPureCartTotal < 300">
                    {{ $t('nextStep') }}: {{ $t('order') }}
                  </v-btn>
                </v-col>
              </template>
              <template v-if="stepper === 1 && !user.id">
                <v-col cols="4">
                  <v-btn class="mb-3" color="secondary" block @click="loginAndContinueShopping()">
                    {{ $t('signInToGainedCredits') }}
                  </v-btn>
                </v-col>
                <v-col cols="7">
                  <v-btn class="mb-3" block color="secondary" @click="stepper = 2" :disabled="!cart.length || getPureCartTotal < 300">
                    {{ $t('nextStep') }}: {{ $t('order') }}({{ $t('nonMember') }})
                  </v-btn>
                </v-col>
              </template>

              <!--step 2-->
              <template v-if="stepper === 2">
                <v-col cols="4">
                  <v-btn class="mb-3" block @click="stepper=1">
                    {{ $t('prevStep') }}: {{ $t('cart') }}
                  </v-btn>
                </v-col>
                <v-col cols="7">
                  <v-btn class="mb-3" block color="secondary" @click.native="placeOrder" :loading="loadingPayment">{{ $t('goToPayment') }}</v-btn>
                  <div v-if="!valid" class="text-center text-12 red--text">{{ $t('orderInfoNotComplete') }}</div>
                </v-col>
              </template>

              <!--step 3-->
              <template v-if="stepper === 3">
                <v-col cols="4">
                  <v-btn class="mb-3" block @click="stepper=2">
                    {{ $t('prevStep') }}: {{ $t('order') }}
                  </v-btn>
                </v-col>
                <v-col cols="7">
                  <v-btn class="mb-3" block color="secondary" @click="pay()" :loading="loadingConfirmation">{{ $t('payment') }}HKD${{ getPaidTotal }}</v-btn>
                </v-col>
              </template>

              <!--step 4-->
              <template v-if="stepper === 4">
                <template v-if="order.payment.paymentStatus === 'completed'">
                  <v-col cols="6" class="mx-auto">
                    <v-btn class="mb-3" color="secondary" block @click.stop="complete">
                      {{ $t('completed') }}
                    </v-btn>
                  </v-col>
                  <v-col cols="6" v-if="user.id" class="mx-auto">
                    <v-btn class="mb-3" color="secondary" block @click="myOrders">
                      {{ $t('goToMyOrders') }}
                    </v-btn>
                  </v-col>
                </template>
                <template v-else>
                  <v-col cols="12">
                    <v-btn class="mb-3" block @click.stop="stepper = 2">
                      {{ $t('resubmitOrder') }}
                    </v-btn>
                  </v-col>
                </template>
              </template>
            </v-col>
          </v-stepper-header>
        </v-stepper>
      </div>
    </template>
    <Address ref="Address"></Address>
    <PickupAddress ref="PickupAddress"></PickupAddress>
    <ConfirmDialog ref="ConfirmDialog"></ConfirmDialog>
  </v-navigation-drawer>
</template>
<script>
import {mapMutations, mapState} from "vuex";
import moment                   from 'moment'
import {
  mdiShoppingOutline,
  mdiPlus,
  mdiMinus,
  mdiClose,
  mdiCheckCircle,
  mdiCheckboxBlankCircleOutline,
  mdiCheck,
  mdiRadioboxBlank,
  mdiRadioboxMarked,
  mdiTruckFast,
  mdiStore,
  mdiPencilOutline,
  mdiCartOutline,
  mdiChevronRight,
  mdiChevronLeft,
  mdiCrown,
  mdiClipboardCheckMultipleOutline,
  mdiShieldCheck,
  mdiCheckboxMarked,
  mdiCheckboxBlankOutline,
  mdiTrashCanOutline,
  mdiDelete,
  mdiGiftOutline,
  mdiDiamondStone
}                               from "@mdi/js"
import _                        from 'lodash'
import logo                     from '~/assets/images/logo.png'
import Cookies                  from "js-cookie";

export default {
  watch : {
    stepper (val) {
      this.scrollUp()
    },

    getTotalWithOutBeforeCredit (val) {
      if (this.gift && this.gift.autoChecked && val >= this.gift.rules.total && this.getCheckOutQty >= this.gift.rules.quantity) {
        this.giftReqeusted = true
      } else {
        this.giftReqeusted = false
      }
    },

    user (val) {
      if (val.email) {
        this.email = val.email
      }
    },

    async shoppingCartDrawer (val) {
      // step reset
      this.stepper = 1
      const root = document.getElementsByTagName('html')[0]
      if (val) {
        root.classList.add('frozen')

        // check delivery day every time cart drawer status changed
        const now = await this.$api.get('/v1/settings/systemTime')
        if (now && now.data) {
          this.setSystemTime(now.data.now)
          await this.setFirstAvailableDate()
        }
      } else {
        root.classList.remove('frozen')
      }
    },
  },

  async mounted () {
    const t = this

    //auto fill email
    if (t.user.email) {
      this.email = t.user.email
    }

    if (t.user.vipTier === 'gold') {
      // this.pushSnackbarMessages(`歡迎黃金會員${t.user.name}光臨！`)
    }

    //gift
    if (this.gift && this.gift.autoChecked && this.getTotalWithOutBeforeCredit >= this.gift.rules.total && this.getCheckOutQty >= this.gift.rules.quantity) {
      this.giftReqeusted = true
    }

    // handling payment gateway redirect return
    // http://localhost:3000/?action=paymentConfirmation&paymentType=paypal&status=success&orderNumber=OPT2022111100172&paymentId=PAYID-MNXDW4I8F1036568C8196323&token=EC-2DG770165D7450104&PayerID=FSWQPPHG3MYUN
    const params = this.$route.query
    if (params.action === 'paymentConfirmation') {
      try {
        document.body.classList.add('loading')
        // await this.$api.get('/v1/orders/status/' + params.orderNumber, { params })
        let order = await this.confirmMyOrder(params.orderNumber, params)
        if (order) {
          this.order = order.data
          this.clearCart()
        }
        setTimeout(() => {
          this.$api.myProfile()
        }, 2000)
        this.shoppingCartDrawer = true
        setTimeout(() => {
          t.stepper = 4
        }, 500)
      } catch (error) {
        console.log(error)
      } finally {
        document.body.classList.remove('loading')
      }
    }

    // digital wallet availability
    try {
      const walletsAvailability = await this.$refs.Stripe.checkPaymentRequestButton()
      if (walletsAvailability) {
        this.walletsAvailability = walletsAvailability
      }
    } catch (e) {
      console.log('wallet error')
    }
  },

  computed : {
    ...mapState(['cart', 'catDiscount', 'buyXGetYFree', 'locations', 'user', 'loginModal', 'snackbarMessages',
      'holidays', 'myPrize',
      'prize', 'prizeDrawer', 'gift', 'systemTime']),
    shoppingCartDrawer : {
      ...mapState({ get : 'shoppingCartDrawer' }),
      ...mapMutations({ set : 'toggleShoppingCartDrawer' }),
    },

    getPrizeTotal () {
      let prize = 0
      if (this.myPrize && this.myPrize.item && this.myPrize.item.type === 'cash') {
        prize = -this.myPrize.item.amount
      }

      return prize
    },

    displayDeliveryDayFormat () {
      const dayLocale = {
        zh : {
          '0' : '日',
          '1' : '一',
          '2' : '二',
          '3' : '三',
          '4' : '四',
          '5' : '五',
          '6' : '六',
        },
        en : {
          '0' : 'Sun',
          '1' : 'Mon',
          '2' : 'Tue',
          '3' : 'Wed',
          '4' : 'Thu',
          '5' : 'Fri',
          '6' : 'Sat',
        }
      }
      const day = moment(this.deliveryDay).format('d')
      return moment(this.deliveryDay).format('YYYY-MM-DD') + ` (${ dayLocale[this.$i18n.locale][day] })`
    },

    creditsUsed () {
      if (this.useCredits && this.creditsCanBeUsed) {
        const tobePaid = this.getTotal + this.getCatDiscountTotal + this.getVoucherDiscountTotal + this.getPrizeTotal + this.getBuyXGetYFreeDiscountTotal
        if (tobePaid - this.user.credits < 20) {
          return tobePaid - 20
        }
        return this.user.credits ? this.user.credits : 0
      }
      return 0

    },

    creditsCanBeUsed () {
      if (this.user && this.user.credits > 0) {
        const tobePaid = this.getTotal + this.getCatDiscountTotal + this.getVoucherDiscountTotal + this.getPrizeTotal + this.getBuyXGetYFreeDiscountTotal
        if (tobePaid - this.user.credits < 20) {
          return tobePaid - 20
        }
        return this.user.credits ? this.user.credits : 0
      }
      return 0
    },

    getTimeSlot () {
      // update to SF only
      return ['E: 09:00-18:00'] //updated 2023-03-24


      const addresses = this.user.addresses
      if (addresses && addresses[this.selectedAddressIndex]) {
        const subDistrict = addresses[this.selectedAddressIndex].subDistrict

        if (this.locations.bOnly.includes(subDistrict)) {
          return ['B: 13:00-17:00']
        } else {
          return ['A: 09:00-13:00', 'B: 13:00-17:00', 'C: 17:00-19:00', 'D: 09:00-19:00']
        }
      }
      return []
    },

    getVoucherDiscountTotal () {
      let value = 0
      if (this.voucher) {
        let totalBeforeVoucher = this.getTotal + this.getCatDiscountTotal + this.getPrizeTotal + this.getBuyXGetYFreeDiscountTotal

        //fixed discount
        if (this.voucher.type === 'fixed') {
          value = this.voucher.value
          const tobePaid = this.getTotal + this.getCatDiscountTotal + this.getPrizeTotal + this.getBuyXGetYFreeDiscountTotal
          if (tobePaid + value < 20) {
            value = (tobePaid - 20) * -1
          }
        }

        //percent discount
        if (this.voucher.type === 'percent') {
          value = Math.floor(totalBeforeVoucher * this.voucher.value / 100)
        }

        //buy x get y free discount
        if (this.voucher.type === 'buyXGetYFree') {
          // TBC
          value = 0
        }
      }
      return value
    },

    isWeekendDelivery () {
      if (this.deliveryDay) {
        const date = new Date(this.deliveryDay)
        return date.getDay() === 0 || date.getDay() === 6
      }
      return false
    },

    getCatDiscountTotal () {
      let value = 0
      const tiers = Object.values(this.autoDiscountTiersAdopted)

      value = _.sumBy(tiers, function ({ completedTier }) {
        return completedTier ? completedTier.value * completedTier.current : 0
      })

      return value

    },

    getBuyXGetYFreeDiscountTotal () {
      let sum = 0
      for (let catId in this.autoBuyXGetYFreeAdopted) {
        const completedTier = this.autoBuyXGetYFreeAdopted[catId].completedTier
        sum += this.getBuyXGetYFreeDiscount(completedTier, catId)
      }

      return sum
    },

    getTotal () {
      const t = this
      let total = _.sumBy(this.cart, function (item) {
        if (!item.product.publish || item.product.soldOut) {
          return 0
        } else {
          const basePrice = item.product.discountPrice || item.product.price
          const vipPrice = t.user.vipTier === 'gold' || t.user.vipTier === 'diamond' ? basePrice - 1 : basePrice
          const addons = item.addons ? item.addons.price : 0
          return item.quantity * (vipPrice + addons)
        }

      })

      total += this.isWeekendDelivery ? 10 : 0

      return total
    },

    getPureCartTotal () {
      let total = _.sumBy(this.cart, function (item) {
        if (!item.product.publish || item.product.soldOut) {
          return 0
        } else {
          return item.quantity * ((item.product.discountPrice || item.product.price) + (item.addons ? item.addons.price : 0))
        }
      })
      return total
    },

    getPaidTotal () {
      return this.getTotal + this.getCatDiscountTotal + this.getVoucherDiscountTotal + this.creditsUsed * -1 + this.getPrizeTotal + this.getBuyXGetYFreeDiscountTotal
      // return this.getTotal + this.getCatDiscountTotal + this.getVoucherDiscountTotal + this.creditsUsed * -1 + this.getPrizeTotal
    },

    getTotalWithOutBeforeCredit () {
      return this.getTotal + this.getCatDiscountTotal + this.getVoucherDiscountTotal + this.getPrizeTotal
    },

    getCheckOutQty () {
      const qty = _.sumBy(this.cart, function (item) {
        if (!item.product.publish || item.product.soldOut) {
          return 0
        } else {
          return _.toInteger(item.quantity)
        }
      })
      return qty
    },

    hasCatDiscount () {
      if (this.catDiscount && Object.values(this.catDiscount).length) {
        return Object.values(this.catDiscount).filter(item => item.discount.length > 0).length
      }
      return 0
    },

    autoDiscountTiersAdopted () {
      const tiers = {}
      // get items count in cart by category
      if (this.catDiscount) {
        const itemQtyInCartByCat = {}
        this.cart.forEach(item => {
          const cat = item.product.category
          if (!itemQtyInCartByCat[cat]) itemQtyInCartByCat[cat] = 0
          if (!item.product.publish || item.product.soldOut) {
            // won't add to quantity of cat discount
          } else {
            itemQtyInCartByCat[cat] += item.quantity
          }
        })


        // loop through itemQtyInCartByCat
        _.forOwn(itemQtyInCartByCat, (qty, catId) => {
          // if category discount exists
          let _catDiscount = _.clone(this.catDiscount[catId])
          const nextTier = []
          if (_catDiscount) {
            _catDiscount.discount = _.orderBy(_catDiscount.discount, ['quantity'])
            let completedTier = null
            let nextTier = []
            _catDiscount.discount.forEach(discountObj => {

              // completed tier
              if (qty >= discountObj.quantity) {
                completedTier = { ...discountObj, current : qty }
              }

              // closest next tier
              if (qty < discountObj.quantity) {
                if (!nextTier.length) {
                  nextTier.push({ ...discountObj, current : qty })
                }
              }
            })
            tiers[catId] = { completedTier, nextTier }
          }
        })
      }
      return tiers
    },

    hasCatBuyXGetYFree () {
      if (this.buyXGetYFree && Object.values(this.buyXGetYFree).length) {
        return Object.values(this.buyXGetYFree).filter(item => item.buyXGetYFree.length > 0).length
      }
      return 0
    },

    autoBuyXGetYFreeAdopted () {
      const tiers = {}
      // get items count in cart by category
      if (this.buyXGetYFree) {
        const itemQtyInCartByCat = {}
        this.cart.forEach(item => {
          const cat = item.product.category
          if (!itemQtyInCartByCat[cat]) itemQtyInCartByCat[cat] = 0
          if (!item.product.publish || item.product.soldOut) {
            // won't add to quantity of cat discount
          } else {
            itemQtyInCartByCat[cat] += item.quantity
          }
        })


        // loop through itemQtyInCartByCat
        _.forOwn(itemQtyInCartByCat, (qty, catId) => {
          // if category discount exists
          let _buyXGetYFree = _.clone(this.buyXGetYFree[catId])
          const nextTier = []
          if (_buyXGetYFree) {
            _buyXGetYFree.buyXGetYFree = _.orderBy(_buyXGetYFree.buyXGetYFree, ['x'])
            let completedTier = null
            let nextTier = []
            _buyXGetYFree.buyXGetYFree.forEach(discountObj => {
              //TODO change logic
              // completed tier
              const requireQty = discountObj.x + discountObj.y
              if (qty >= requireQty) {
                completedTier = { ...discountObj, current : qty }
              }

              // closest next tier
              if (qty < requireQty) {
                if (!nextTier.length) {
                  nextTier.push({ ...discountObj, current : qty })
                }
              }
            })
            tiers[catId] = { completedTier, nextTier }
          }
        })
      }
      return tiers
    },
  },
  async created () {
    // select first available delivery day
    await this.setFirstAvailableDate()

    // categories
    const categoriesWithProducts = await this.$api.get('/v1/categories?products=1&status=published')
    if (categoriesWithProducts.data && categoriesWithProducts.data.results) {
      this.categoriesWithProducts = categoriesWithProducts.data.results
      const discount = {}
      const buyXGetYFree = {}
      categoriesWithProducts.data.results.forEach(cat => {
        if (cat.discountTierEnabled && cat.discount && cat.discount.length) {
          discount[cat.id] = { discount : cat.discount, name : cat.name }
        }

        if (cat.buyXGetYFreeEnabled && cat.buyXGetYFree && cat.buyXGetYFree.length) {
          buyXGetYFree[cat.id] = { buyXGetYFree : cat.buyXGetYFree, name : cat.name }
        }
      })
      this.setCatDiscount(discount)
      this.setBuyXGetYFree(buyXGetYFree)
    }

    let code = this.$route.query.code
    if (this.user.isStudent) {
      if (this.user.student.status === 'approved') {
        code = 'STUDENT'
      }
    }

    if (code) {
      try {
        const getVoucher = await this.$api.get('/v1/vouchers/validate/' + code)
        if (getVoucher.data) {
          this.voucher = getVoucher.data
          this.pushSnackbarMessages(this.$t('successfulUsed') + this.voucher.name[this.$i18n.locale] + `${ this.$t('voucherCode') }: ` + code)
        }
      } catch (e) {
      }
    }
  },
  data : () => ({
    giftReqeusted       : false,
    walletsAvailability : {},
    useCredits          : true,
    order               : null,
    valid               : true,
    loadingConfirmation : false,

    deliveryType : 'delivery',

    icons : {
      mdiShoppingOutline, mdiPlus, mdiMinus, mdiClose, mdiCheckCircle, mdiCheckboxBlankCircleOutline, mdiCheck,
      mdiRadioboxBlank, mdiRadioboxMarked, mdiTruckFast, mdiStore, mdiPencilOutline, mdiCartOutline, mdiChevronRight,
      mdiChevronLeft, mdiCrown, mdiClipboardCheckMultipleOutline, mdiShieldCheck, mdiCheckboxMarked,
      mdiCheckboxBlankOutline, mdiTrashCanOutline, mdiGiftOutline, mdiDiamondStone
    },

    //address
    selectedAddressIndex : null,

    //payment
    loadingPayment : false,

    //stepper
    stepper : 1,

    //voucher
    loadingVoucher : false,
    voucher        : null,
    voucherMessage : '',

    //deliver day & timeslot
    deliveryDay      : '',
    deliveryTimeSlot : 'E: 09:00-18:00',

    //non-member email
    email : '',

    //date picker menu
    menu1 : false,

    payment : {
      paymentType : null
    }
  }),

  methods : {
    ...mapMutations(['setCart', 'pushSnackbarMessages', 'toggleLoginModal', 'setCatDiscount', 'setBuyXGetYFree',
      'setLatestOrder',
      'togglePrizeDrawer', 'setSystemTime', 'setHolidays']),

    suggestBuyMore (tier) {
      const currentIndex = tier.completedTier.current % (tier.completedTier.x + tier.completedTier.y)
      if (currentIndex > 0) {
        const nextLevel = Math.ceil(tier.completedTier.current / (tier.completedTier.x + tier.completedTier.y))
        const requiredQty = tier.completedTier.x + tier.completedTier.y
        const addMore = nextLevel * requiredQty - tier.completedTier.current

        return this.$t('suggestBuyMore', { x : addMore, y : tier.completedTier.y })
      } else {
        return ''
      }
    },

    getBuyXGetYFreeDiscount (completedTier, catId) {
      if (!completedTier || !catId) return 0

      const t = this
      const freeQty = Math.floor(completedTier.current / (completedTier.x + completedTier.y)) * completedTier.y
      let itemTable = []
      const items = this.cart.filter(item => item.product.category === catId)
      items.forEach(item => {
        const product = item.product
        const basePrice = product.discountPrice || product.price
        const sellingPrice = t.user.vipTier === 'gold' || t.user.vipTier === 'diamond' ? basePrice - 1 : basePrice
        const _item = { ...product, sellingPrice }
        const fillItems = Array(item.quantity).fill(_item)
        itemTable = itemTable.concat(fillItems)
      })

      itemTable.sort((a, b) => {
        return a.sellingPrice - b.sellingPrice
      })

      const freeItems = _.slice(itemTable, 0, freeQty)

      return _.sumBy(freeItems, 'sellingPrice') * -1
    },

    async promptForClearCart () {
      const confirmClear = await this.$refs.ConfirmDialog.open(this.$t('clearCart'), this.$t('clearCartPrompt'), mdiDelete)
      if (confirmClear) {
        this.$api.updateCart([])
      }

    },
    myOrders () {
      this.shoppingCartDrawer = !this.shoppingCartDrawer
      this.$router.push('/dashboard/OrderList')
    },

    scrollUp () {
      const cart = document.querySelector('#shopping-cart > div.v-navigation-drawer__content');
      cart.scrollTop = 0;
    },

    async setFirstAvailableDate () {
      const dateNow = moment(this.systemTime)
      const holidays = await this.$api.get('/v1/settings/holidays')
      if (holidays && holidays.data) {
        this.setHolidays(holidays.data)
      }
      const map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      let days = map.map((item, index) => {
        return dateNow.clone().add(index + 2, 'days').format('YYYY-MM-DD')
      }).filter(item => this.allowDates(item));
      this.deliveryDay = days[0]

      return true

    },

    allowDates (val) {
      const dateNow = moment(this.systemTime)
      let skipDays = 1
      if (dateNow.weekday() === 5) {
        //for friday, delivery on tue
        skipDays = 3
      }
      if (dateNow.weekday() === 6) {
        //for sat, delivery on tue
        skipDays = 2
      }
      return val > dateNow.clone().add(skipDays, 'days').format('YYYY-MM-DD') && this.holidays.indexOf(val) === -1
    },

    complete () {
      this.shoppingCartDrawer = !this.shoppingCartDrawer
      // this.$router.push('/')
      this.$router.replace({ 'query' : null }).catch(e => {
      })
    },
    clearCart () {
      if (this.order.orderStatus === 'confirmed') {
        this.$api.updateCart([])
      }
    },

    async loginAndContinueShopping () {
      this.toggleLoginModal(true)
      this.shoppingCartDrawer = true
    },


    async pay () {
      // this function must freeze window
      // by adding a top grey transparent layer with loader
      // to prevent user exit the cart window

      document.body.classList.add('loading')
      try {
        this.loadingConfirmation = true

        this.setLatestOrder(this.order)
        // stripe
        if (this.payment.paymentType === 'stripe') {
          const result = await this.$refs.Stripe.submit()
          if (result) {
            let order = await this.confirmMyOrder(this.order.orderNumber, { accessCode : this.order.accessCode })
            if (order) {
              this.order = order.data
              this.clearCart()
            }
            setTimeout(() => {
              this.$api.myProfile()
            }, 2000)
          }
          this.stepper = 4
          document.body.classList.remove('loading')
        }

        // paypal
        if (this.payment.paymentType === 'paypal') {
          window.location.replace(this.payPalRedirectUrl)
        }
        // asia pay
        if (['alipay', 'payme', 'wechatpay', 'fps', 'octopus'].includes(this.payment.paymentType)) {
          const params = this.asiapay
          const form = document.createElement('form')
          form.method = 'post'
          form.action = params.action
          for (const key in params) {
            if (params.hasOwnProperty(key)) {
              const hiddenField = document.createElement('input');
              hiddenField.type = 'hidden';
              hiddenField.name = key;
              hiddenField.value = params[key];
              form.appendChild(hiddenField);
            }
          }
          document.body.appendChild(form);
          form.submit();
        }
      } catch (e) {
        console.log(e)
        document.body.classList.remove('loading')
      } finally {
        this.loadingConfirmation = false
      }
    },

    async confirmMyOrder (orderNumber, params) {
      const order = await this.$api.get('/v1/orders/status/' + orderNumber, { params })
      if (order.data && order.data.orderStatus === 'confirmed') {
        await this.$api.getMyPrize()
        // pixel tracker
        await this.purchaseTracker(order.data)
      }
      return order
    },

    async purchaseTracker (order) {
      // skip of local testing

      const hostname = window.location.hostname
      if (hostname.indexOf('localhost') > -1) return true

      // use cookies to store temporary store success order to prevent multi triggering
      const orderCookieName = 'order' + order.orderNumber
      const cookie = Cookies.get(orderCookieName)
      if (cookie) {
        return true
      } else {
        Cookies.set(orderCookieName, 1, { expires : 1 / 144 })
      }

      try {
        if (order.orderStatus !== 'confirmed') return
        // pixel tracker
        if (fbq) {
          fbq('track', 'Purchase', {
            value    : order.paidTotal,
            currency : 'HKD',
          })
        }

        // google tag manager
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ ecommerce : null })
        window.dataLayer.push({
          event     : 'purchase',
          ecommerce : {
            email          : order.email,
            transaction_id : order.orderNumber,
            value          : order.paidTotal,
            tax            : 0,
            shipping       : 0,
            currency       : "HKD",
            coupon         : order.voucherUsed ? order.voucherUsed.code : '',
            items          : order.items.map(item => ({
                item_id        : item.product.id,
                item_name      : item.product.name.zh,
                item_brand     : "Optmeal",
                item_category  : item.product.category.name.zh,
                item_category2 : item.product.category.name.en,
                price          : item.unitPrice,
                quantity       : item.quantity
              })
            )
          }
        });

      } catch (error) {
        // wrapper
        // console.log(error)
      }
      return true
    },

    async placeOrderTracker () {
      try {
        // facebook pixel
        if (fbq) {
          fbq('track', 'InitiateCheckout')
        }

        // google tag manager
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ ecommerce : null })
        window.dataLayer.push({
          event     : 'begin_checkout',
          ecommerce : {
            currency : "HKD",
            value    : this.order.paidTotal,
            coupon   : this.order.voucherUsed ? this.order.voucherUsed.code : '',
            items    : this.order.items.map(item => ({
                item_id        : item.product.id,
                item_name      : item.product.name.zh,
                item_brand     : "Optmeal",
                item_category  : item.product.category.name.zh,
                item_category2 : item.product.category.name.en,
                price          : item.unitPrice,
                quantity       : item.quantity
              })
            )
          }
        })
      } catch (error) {
        console.log(error)
        // wrapped
      }
      return true
    },

    async placeOrder () {
      this.loadingPayment = true
      try {
        const valid = await this.$refs.orderForm.validate()

        if (!this.deliveryType) {
          return this.pushSnackbarMessages(this.$t('deliveryMethodPrompt'))
        }

        if (!_.isNumber(this.selectedAddressIndex)) {
          return this.pushSnackbarMessages(this.deliveryType === 'pickup' ? this.$t('pickupAddressPrompt') : this.$t('deliveryAddressPrompt'))
        }

        if (!this.deliveryDay) {
          return this.pushSnackbarMessages(this.$t('deliveryDatePrompt'))
        }

        if (!this.deliveryTimeSlot) {
          return this.pushSnackbarMessages(this.$t('deliveryTimeSlotPrompt'))
        }

        if (!this.email && !this.user.id) {
          return this.pushSnackbarMessages(this.$t('emailPrompt'))
        }

        if (!this.payment.paymentType) {
          return this.pushSnackbarMessages(this.$t('paymentMethodPrompt'))
        }

        if (valid) {
          const addresses = this.deliveryType === 'delivery' ? this.user.addresses : this.user.pickupAddresses
          const address = addresses[this.selectedAddressIndex]

          const order = {
            locale             : this.$i18n.locale,
            email              : this.user.id ? this.user.email : this.email,
            recipient          : address.recipient,
            phone              : address.phone,
            area               : address.area,
            district           : address.district,
            subDistrict        : address.subDistrict,
            deliveryDay        : this.deliveryDay,
            deliveryTimeSlot   : this.deliveryTimeSlot,
            fullAddress        : address.fullAddress,
            items              : this.cart.filter(item => item.product.publish && !item.product.soldOut).map(item => ({
              product   : item.product.id, quantity : item.quantity,
              unitPrice : item.product.discountPrice || item.product.price,
              addons    : item.addons
            })),
            voucherUsed        : this.voucher ? this.voucher.code : null,
            payment            : this.payment,
            creditsUsed        : this.creditsUsed,
            deliveryType       : this.deliveryType,
            pickupLocationCode : this.deliveryType === 'pickup' ? address.code : null
          }

          if (this.giftReqeusted) {
            order.gift = this.gift.id
          }

          let result
          if (this.user.id) {
            result = await this.$api.post('/v1/orders/', order)
          } else {
            result = await this.$api.post('/v1/orders/nonMember', order)
          }

          if (result && result.data) {
            // pixel tracker
            this.order = result.data.order
            await this.$api.myProfile(true)
            await this.placeOrderTracker()
            switch (order.payment.paymentType) {
              case 'stripe':
                this.$refs.Stripe.initialize(result.data)
                this.stepper = 3
                break
              case 'paypal':
                this.payPalRedirectUrl = result.data.payPalRedirectUrl
                // this.stepper = 4
                await this.pay()
                break
              case 'payme':
              case 'alipay':
              case 'wechatpay':
              case 'fps':
              case 'octopus':
                // this.submitOrderToAsiaPay(result.data.asiaPayObj)
                this.asiapay = result.data.asiaPayObj
                await this.pay()
                break
              default:
                break
            }
          }
        }
      } catch (error) {
        console.log(error)
        if (error.response && error.response.data) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          // if (error.response.data.message === '優惠碼只供學生使用') {
          //   this.voucherMessage = this.$t('voucherAvailableForStudentUsersOnly')
          // } else  {
          //
          // }
          this.pushSnackbarMessages(error.response.data.message)
        } else {
          this.pushSnackbarMessages(error.toString())
        }
      } finally {
        this.loadingPayment = false
      }
    },

    submitOrderToAsiaPay (params) {
      const form = document.createElement('form');
      form.method = 'post'
      form.action = params.action
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const hiddenField = document.createElement('input');
          hiddenField.type = 'hidden';
          hiddenField.name = key;
          hiddenField.value = params[key];
          form.appendChild(hiddenField);
        }
      }
      document.body.appendChild(form);

      form.submit();
    },

    async openAddress (addressIndex) {
      const selectedAddressIndex = await this.$refs.Address.open(addressIndex)
      if (_.isNumber(selectedAddressIndex)) {
        this.selectedAddressIndex = selectedAddressIndex
      }
    },

    async openPickupAddress (addressIndex) {
      const selectedAddressIndex = await this.$refs.PickupAddress.open(addressIndex)
      if (_.isNumber(selectedAddressIndex)) {
        this.selectedAddressIndex = selectedAddressIndex
      }
    },
    async customQuantity (event, index, byButton) {
      if (!Number.isInteger(parseInt(event))) return;
      const pureCartItemToApi = this.cart.map(item => ({
        product : item.product.id, quantity : item.quantity, addons : item.addons
      }))
      const prevQtyInCart = pureCartItemToApi[index].quantity

      if (this.cart[index] && this.cart[index].product.name.zh.indexOf('試食') > -1) {
        if (_.toInteger(event) > 0) {
          return this.pushSnackbarMessages(this.$t('trialPackLimitExceed'))
        }
      }

      if (byButton) {
        pureCartItemToApi[index].quantity += _.toInteger(event)
      } else {
        pureCartItemToApi[index].quantity = _.toInteger(event)
      }

      // check if quantity is below 1, and ask if user wants to remove item from cart
      if (pureCartItemToApi[index].quantity < 1) {
        const confirmRemoveItem = await this.$refs.ConfirmDialog.open(this.$t('delete'), this.$t('deleteCartItemPrompt'), mdiDelete)
        if (confirmRemoveItem) {
          pureCartItemToApi.splice(index, 1)
        } else {
          if (!byButton && event == 0) {
            pureCartItemToApi[index].quantity = prevQtyInCart
          } else {
            pureCartItemToApi[index].quantity = 1
          }
        }
      }

      await this.$api.updateCart(pureCartItemToApi)
    },

    validateVoucher : _.debounce(async function (code) {
      if (!code) return
      try {
        this.loadingVoucher = true
        const getVoucher = await this.$api.get('/v1/vouchers/validate/' + code)
        if (getVoucher.data) {
          const moq = getVoucher.data.moq
          const mov = getVoucher.data.mov
          if (this.getCheckOutQty >= moq && this.getCheckOutSum() >= mov) {
            this.voucher = getVoucher.data
            this.voucherMessage = `${ this.voucher.code } (${ this.voucher.name[this.$i18n.locale] })${ this.$t('applied') }`
          } else {
            let message = ''
            if (this.getCheckOutQty < moq) {
              message = `${ this.$t('voucherCode') }「${ getVoucher.data.code }」${ this.$t('moq', { value : moq }) }`
            } else {
              message = `${ this.$t('voucherCode') }「${ getVoucher.data.code }」${ this.$t('mov', { value : mov }) }`
            }
            this.pushSnackbarMessages(message)
            this.voucherMessage = message
            const self = this
            setTimeout(function () {
              self.$refs['voucherInput'].value = ''
            }, 5000)
          }
        }
      } catch (error) {
        if (error.response && error.response.data) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          this.voucherMessage = error.response.data.message
        } else {
          this.voucherMessage = this.$t('invalidVoucher')
        }
        console.log(error)
      } finally {
        setTimeout(() => {
          this.loadingVoucher = false
        }, 300)

      }
    }, 500),

    async removeItem (index) {
      const pureCartItemToApi = this.cart.map(item => ({ product : item.product.id, quantity : item.quantity }))

      const confirmRemoveItem = await this.$refs.ConfirmDialog.open(this.$t('delete'), this.$t('deleteCartItemPrompt'), mdiDelete)
      if (confirmRemoveItem) {
        pureCartItemToApi.splice(index, 1)
      }

      await this.$api.updateCart(pureCartItemToApi)
    },

    getCheckOutSum () {
      const t = this
      return _.sumBy(this.cart, function (item) {
        if (!item.product.publish || item.product.soldOut) {
          return 0
        } else {
          const basePrice = item.product.discountPrice || item.product.price
          const vipPrice = t.user.vipTier === 'gold' || t.user.vipTier === 'diamond' ? basePrice - 1 : basePrice
          const addonsPrice = item.addons ? item.addons.price : 0
          return (vipPrice + addonsPrice) * item.quantity
        }
      })
    },
  }
}
</script>
