<template>
  <v-dialog v-model="topUpCreditsDialog" fullscreen hide-overlay @close="close" persistent>
    <v-container fluid class="w100p h100p background-color-white" id="topup-dialog">
      <v-row class="py-1 px-3 ma-0 justify-space-between align-center position-fixed top-0 left-0 w100p background-color-white border-b">
        <span>{{ $t('topupCredits') }}</span>
        <v-btn icon color="secondary" @click="topUpCreditsDialog = false">{{ $t('close') }}</v-btn>
      </v-row>
      <v-row class="pt-8 pb-250 background-color-white">
        <v-col cols="12">
          <v-stepper v-model="step" elevation="0">
            <v-stepper-items>
              <v-stepper-content step="1" class="py-1 px-2">
                <v-row justify="center" align="center">
                  <v-col cols="12">
                    <h4>{{ $t('selectTopupCard') }}</h4>
                    <div>*{{ $t('topupCreditsSuccessNote') }}</div>
                  </v-col>
                  <template v-if="topupCredits.length">
                    <v-col cols="12" lg="4" md="4" v-for="(card,index) in topupCredits" :key="index">
                      <v-card flat outlined @click="selected = card.id" class="topupCard" :class="{selected : selected === card.id}">
                        <v-card-title class="d-flex justify-space-between">
                          <span>{{ card.name[$i18n.locale] }}</span>
                          <v-icon class="blue--text text--darken-3" v-if="selected === card.id">{{ icons.mdiCheck }}</v-icon>
                        </v-card-title>
                        <v-card-text class="px-2">
                          <v-img class="border-radius-15" contain :src="card.images[0].medium.path"></v-img>
                          <h2 class="my-2 pb-2">{{ card.title[$i18n.locale] }}</h2>
                          <p class="mb-1">{{ $t('usage') }}: <br>{{ card.desc[$i18n.locale] }}</p>
                          <p class="mb-1">{{ $t('expDate') }}: {{ $t('permanent') }}</p>
                          <p class="mb-1">{{ $t('purchaseLimit') }}: {{ card.maxQtyPerUser }} {{ $t('times') }}</p>
                          <p class="mb-1">{{ $t('creditsEarned') }}: <b>{{ card.credits }}</b></p>
                          <p class="mb-1 pink--text text--darken-2">{{ $t('price') }}: <b>HKD${{ card.price }}</b></p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </template>
                  <v-col cols="12" v-else>
                    <p>{{ $t('topupCardsSoldOutMsg') }}</p>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="2" class="py-1 px-2">
                <v-row justify="center" align="center">
                  <v-col cols="12">
                    <h4>{{ $t('topupDetailAndPayment') }}</h4>
                  </v-col>
                  <v-col cols="12" lg="4" md="6">
                    <v-card flat v-if="selectedCard">
                      <v-card-text class="px-2">
                        <v-form @submit.prevent ref="topupForm" v-model="valid" lazy-validation>
                          <v-row class="no-border">
                            <v-col><h4 class="mt-6 sub">1.{{ $t('selectedTopupCard') }}</h4></v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-img class="border-radius-15" contain :src="selectedCard.images[0].medium.path"></v-img>
                            </v-col>
                          </v-row>
                          <v-row class="no-border border-top mt-6">
                            <v-col><h4 class="mt-6 sub">2.{{ $t('emailWithDesc') }}</h4></v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field v-model="email" :rules="[$validations.required, $validations.email]" single-line outlined hide-details></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row class="no-border border-top mt-6">
                            <v-col>
                              <h4 class="mt-6 sub">3.{{ $t('paymentMethod') }} ({{ $t('payment') }} HKD${{ selectedCard.price }})</h4>
                            </v-col>
                            <v-col cols="12" class="red--text text--darken-4 text-12 pt-0 mt-0">*{{ $t('paymentSucessMsg') }}</v-col>
                          </v-row>
                          <v-row class="pt-0 no-border pb-16">
                            <v-col cols="12" class="d-flex flex-column justify-center align-start pa-0">
                              <v-radio-group class="col-12" v-model="payment.paymentType" column :rules="[$validations.required]" hide-details>
                                <v-row class="align-center pb-1-eee" @click="payment.paymentType = 'cc'">
                                  <v-col cols="1">
                                    <v-radio :on-icon="icons.mdiRadioboxMarked"
                                             color="secondary"
                                             value="cc"
                                             class="ma-0"
                                             :off-icon="icons.mdiRadioboxBlank"></v-radio>
                                  </v-col>
                                  <v-col cols="11" class="d-flex align-center pa-0">
                                    <v-col cols="5">
                                      {{ $t('card') }}
                                    </v-col>
                                    <v-col cols="7" class="d-flex align-center">
                                      <v-img max-width="39" contain :src="require('~/assets/images/payment_icons/visa.png')"></v-img>
                                      <v-img class="ml-1" max-width="35" contain :src="require('~/assets/images/payment_icons/master.png')"></v-img>
                                      <v-img class="ml-1" max-width="35" contain :src="require('~/assets/images/payment_icons/americanexpress.png')"></v-img>
                                    </v-col>
                                  </v-col>
                                </v-row>
                                <!--                                <v-row class="align-center pb-1-eee" @click="payment.paymentType = 'stripe'">
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
                                                                    <v-col cols="7" class="d-flex align-center">
                                                                      <v-img max-width="39" contain :src="require('~/assets/images/payment_icons/visa.png')"></v-img>
                                                                      <v-img class="ml-1" max-width="35" contain :src="require('~/assets/images/payment_icons/master.png')"></v-img>
                                                                      <v-img class="ml-1" max-width="35" contain :src="require('~/assets/images/payment_icons/americanexpress.png')"></v-img>
                                                                      <v-img class="ml-1 br-5" v-if="walletsAvailability.applePay" max-width="35" contain :src="require('~/assets/images/payment_icons/applepay.png')"></v-img>
                                                                      <v-img class="ml-1 br-5" v-if="walletsAvailability.googlePay" max-width="35" contain :src="require('~/assets/images/payment_icons/googlepay.png')"></v-img>
                                                                    </v-col>
                                                                  </v-col>
                                                                </v-row>-->
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
                                  <v-col cols="11" class="d-flex align-center pa-0 flex-wrap">
                                    <v-col cols="5" class="mb-0 pb-0">
                                      Payme
                                    </v-col>
                                    <v-col cols="7" class="d-flex align-center mb-0 pb-0">
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
                      </v-card-text>
                    </v-card v-if=>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content class="px-lg-6 px-md-6 px-3" step="3">
                <div class="navbar-scroll">
                  <h3 class="mb-6" v-if="selectedCard">
                    {{ $t('payment') }}：HKD${{ selectedCard.price }}<br>
                    <span class="text-12 green--text text--darken-4 font-weight-light" style="line-height: 12px;">
                      <v-icon color="green darken-4">{{ icons.mdiShieldCheck }}</v-icon>
                      *{{ $t('securePaymentMsg') }}
                    </span>
                  </h3>
                  <v-row class="pt-0 no-border" v-show="order && order.payment.paymentType === 'stripe'">
                    <StripeForTopup ref="StripeForTopup"></StripeForTopup>
                  </v-row>
                  <v-row class="pt-0 no-border" v-show="order && order.payment.paymentType === 'paypal'">
                    <v-col cols="12" class="font-weight-bold">{{ $t('redirectingToPaypal') }}．．．</v-col>
                  </v-row>
                </div>
              </v-stepper-content>

              <v-stepper-content class="px-lg-6 px-md-6 px-3" step="4">
                <template v-if="order">
                  <template v-if="order.payment.paymentStatus === 'completed'">
                    <v-row class="pt-0 no-border">
                      <v-col cols="12" class="text-18 font-weight-bold">
                        <v-icon color="green" class="darken-2">{{ icons.mdiCheck }}</v-icon>
                        {{ $t('paymentReceived') }}：{{ order.price }}
                      </v-col>
                      <v-col cols="12" v-html="$t('successfulTopupMsg', {value: order.topupValue})"></v-col>
                      <v-col cols="12">{{ $t('yourTopupIdIs') }}：{{ order.orderNumber }}。</v-col>
                      <v-col cols="12">{{ $t('topUpReceiptSent') }}：{{ order.email }}。</v-col>
                    </v-row>
                  </template>

                  <template v-else>
                    <v-row class="pt-0 no-border">
                      <v-col cols="12" class="text-18 font-weight-bold">
                        <v-icon color="red" class="darken-2">{{ icons.mdiClose }}</v-icon>
                        {{ $t('paymentFailureTopupNumber') }}： {{ order.orderNumber }}。
                      </v-col>
                      <v-col cols="12">{{ $t('orderFailedReminder') }}</v-col>
                      <v-col cols="12">{{ $t('contactUsIfYouHaveQuestion') }}</v-col>
                    </v-row>
                  </template>
                </template>
              </v-stepper-content>
            </v-stepper-items>

            <div class="pa-3 position-fixed w100p bottom-0 left-0 border-t background-color-white">
              <v-stepper-header class="no-shadow" style="height:45px">
                <v-stepper-step :completeIcon="icons.mdiCheck" class="py-1" :complete="step > 1" step="1">{{ $t('selectTopupCard') }}</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :completeIcon="icons.mdiCheck" class="py-1" :complete="step > 2" step="2">{{ $t('detail') }}</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :completeIcon="icons.mdiCheck" class="py-1" :complete="step > 3" step="3">{{ $t('payment') }}</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :completeIcon="icons.mdiCheck" class="py-1" step="4">{{ $t('status') }}</v-stepper-step>
              </v-stepper-header>

              <div class="d-flex justify-space-between">
                <!-- step 1 -->
                <template v-if="step === 1">
                  <template v-if="user.id">

                    <v-col cols="4">
                      <v-btn block @click="close">{{ $t('cancel') }}</v-btn>
                    </v-col>
                    <v-col cols="8">
                      <v-btn block color="secondary" @click="step += 1" :disabled="!selected">{{ $t('nextStep') }}: {{ selectedCard ? selectedCard.title[$i18n.locale] : $t('pleaseSelectTopupCard') }}</v-btn>
                    </v-col>
                  </template>
                  <template v-else>
                    <v-col cols="12">
                      <p>{{ $t('loginToTopupMsg') }}</p>
                      <v-btn block @click="toggleLoginModal(true)" color="secondary">{{ $t('pleaseLoginOrReg') }}</v-btn>
                    </v-col>
                  </template>
                </template>

                <!-- step 2 -->
                <template v-if="step === 2">
                  <v-col cols="4">
                    <v-btn block @click="step -= 1">{{ $t('prevStep') }}</v-btn>
                  </v-col>
                  <v-col cols="8">
                    <v-btn block color="secondary" @click="placeOrder" :loading="loadingPayment">{{ $t('goToPayment') }}</v-btn>
                  </v-col>
                </template>

                <!-- step 3 -->
                <template v-if="step === 3">
                  <v-col cols="4">
                    <v-btn block @click="step -= 1">{{ $t('prevStep') }}</v-btn>
                  </v-col>
                  <v-col cols="8">
                    <v-btn block color="secondary" @click="pay" :loading="loadingConfirmation">{{ $t('payment') }}HKD${{ selectedCard.price }}</v-btn>
                  </v-col>
                </template>

                <!-- step 4 -->
                <template v-if="step === 4">
                  <template v-if="order">
                    <template v-if="order.payment.paymentStatus === 'completed'">
                      <v-col cols="6">
                        <v-btn class="mb-3" block color="secondary" @click.stop="complete">
                          {{ $t('completed') }}
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn class="mb-3" block color="secondary" @click="myOrders">
                          {{ $t('toMyToupRecords') }}
                        </v-btn>
                      </v-col>
                    </template>
                    <template v-else>
                      <v-col cols="12">
                        <v-btn class="mb-3" block @click.stop="step = 2">
                          {{ $t('resubmitOrder') }}
                        </v-btn>
                      </v-col>
                    </template>
                  </template>
                </template>
              </div>
            </div>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script>
import TermsAndConditions       from "@/pages/about/TermsAndConditions";
import {mapMutations, mapState} from "vuex";
import {
  mdiCartOutline,
  mdiCheck,
  mdiCheckboxBlankCircleOutline,
  mdiCheckCircle, mdiChevronLeft, mdiChevronRight, mdiClipboardCheckMultipleOutline,
  mdiClose, mdiCrown,
  mdiMinus, mdiPencilOutline,
  mdiPlus, mdiRadioboxBlank, mdiRadioboxMarked, mdiShieldCheck,
  mdiShoppingOutline, mdiStore, mdiTruckFast
}                               from "@mdi/js";
import _                        from "lodash";

export default {
  name     : "TopUpCreditsDialog",
  computed : {
    ...mapState(['topupCredits', 'user', 'snackbarMessages', 'loginModal']),
    topUpCreditsDialog : {
      ...mapState({ get : 'showTopUpCreditsDialog' }),
      ...mapMutations({ set : 'toggleTopUpCreditsDialog' }),
    },
    selectedCard () {
      if (this.selected) {
        return this.topupCredits.filter(item => item.id === this.selected)[0]
      }
      return null
    },
  },
  watch    : {
    step () {
      this.scrollUp()
    },
    topUpCreditsDialog (val) {
      // step reset
      this.step = 1
      const root = document.getElementsByTagName('html')[0]
      if (val) {
        root.classList.add('frozen')
      } else {
        root.classList.remove('frozen')
      }
    },
  },
  async mounted () {
    if (this.topupCredits.length === 1) {
      this.selected = this.topupCredits[0].id
    }

    if (this.user.email) {
      this.email = this.user.email
    }

    // handling payment gateway redirect return
    // http://localhost:3000/?action=topupPaymentConfirmation&paymentType=paypal&status=success&orderNumber=OPT2022111100172&paymentId=PAYID-MNXDW4I8F1036568C8196323&token=EC-2DG770165D7450104&PayerID=FSWQPPHG3MYUN
    const params = this.$route.query

    if (params.showTopupDialog) {
      this.topUpCreditsDialog = true
    }

    if (params.action === 'topupPaymentConfirmation') {
      try {
        document.body.classList.add('loading')
        // await this.$api.get('/v1/orders/status/' + params.orderNumber, { params })
        let order = await this.confirmMyOrder(params.orderNumber, params)
        if (order) {
          this.order = order.data
        }
        setTimeout(() => {
          this.$api.myProfile()
        }, 2000)
        this.topUpCreditsDialog = true
        setTimeout(() => {
          this.step = 4
          document.body.classList.remove('loading')
        }, 500)
      } catch (error) {
        console.log(error)
        document.body.classList.remove('loading')
      }
    }
    // digital wallet availability
    try {
      const walletsAvailability = await this.$refs.StripeForTopup.checkPaymentRequestButton()
      if (walletsAvailability) {
        this.walletsAvailability = walletsAvailability
      }
    } catch (e) {
      console.log('wallet error')
    }
  },
  methods : {
    ...mapMutations(['pushSnackbarMessages', 'toggleLoginModal']),
    myOrders () {
      this.topUpCreditsDialog = !this.topUpCreditsDialog
      this.$router.push('/dashboard/TopupList')
    },
    complete () {
      this.topUpCreditsDialog = !this.topUpCreditsDialog
      // this.$router.push('/')
      this.$router.replace({ 'query' : null }).catch(e => {
      })
    },
    async pay () {
      // this function must freeze window
      // by adding a top grey transparent layer with loader
      // to prevent user exit the cart window

      document.body.classList.add('loading')
      try {
        this.loadingConfirmation = true

        // stripe
        if (this.payment.paymentType === 'stripe') {
          const result = await this.$refs.StripeForTopup.submit()
          if (result) {
            let order = await this.confirmMyOrder(this.order.orderNumber, { accessCode : this.order.accessCode })
            if (order) {
              this.order = order.data
            }
            setTimeout(() => {
              this.$api.myProfile()
            }, 2000)
          }
          this.step = 4
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
      const order = await this.$api.get('/v1/topups/status/' + orderNumber, { params })
      return order
    },

    scrollUp () {
      const cart = document.querySelector('#app > div.v-dialog__content.v-dialog__content--active > div')
      cart.scrollTop = 0;
    },

    close () {
      this.reset()
    },
    confirm () {
      this.reset()
    },
    reset () {
      this.topUpCreditsDialog = false
    },

    async placeOrder () {
      try {
        this.loadingPayment = true
        const valid = await this.$refs.topupForm.validate()

        if (!this.email) {
          return this.pushSnackbarMessages(this.$t('emailPrompt'))
        }

        if (!this.payment.paymentType) {
          return this.pushSnackbarMessages(this.$t('paymentMethodPrompt'))
        }

        if (valid) {
          const order = {
            topupCard : this.selected,
            email     : this.email,
            payment   : this.payment,
          }
          const result = await this.$api.post('/v1/topups/placeOrder', order)

          if (result && result.data) {
            // pixel tracker
            this.order = result.data.order
            switch (order.payment.paymentType) {
              case 'stripe':
                this.$refs.StripeForTopup.initialize(result.data)
                this.step = 3
                break
              case 'paypal':
                this.payPalRedirectUrl = result.data.payPalRedirectUrl
                // this.step = 4
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
          if (error.response.data.message === '優惠碼只供學生使用') {
            this.voucherMessage = this.$t('voucherAvailableForStudentUsersOnly')
          }
          this.pushSnackbarMessages(this.$t('voucherAvailableForStudentUsersOnly'))
        } else {
          this.pushSnackbarMessages(error.toString())
        }
      } finally {
        this.loadingPayment = false
      }
    },
  },
  data    : () => ({
    loadingConfirmation : false,
    order               : null,
    walletsAvailability : {},
    payment             : {
      paymentType : null
    },
    email               : '',
    valid               : true,
    selected            : '',
    step                : 1,
    //payment
    loadingPayment : false,
    icons          : {
      mdiShoppingOutline, mdiPlus, mdiMinus, mdiClose, mdiCheckCircle, mdiCheckboxBlankCircleOutline, mdiCheck,
      mdiRadioboxBlank, mdiRadioboxMarked, mdiTruckFast, mdiStore, mdiPencilOutline, mdiCartOutline, mdiChevronRight,
      mdiChevronLeft, mdiCrown, mdiClipboardCheckMultipleOutline,
      mdiShieldCheck
    },
  })
}
</script>
