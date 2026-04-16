<template>
  <footer class="bg-grey-light py-16">
    <v-container>
      <v-row>
        <v-col cols="12" lg="3">
          <a href="/">
            <v-avatar class="mb-2" tile size="200" style="margin-bottom: -50px !important;">
              <img class="weblogo" src="~/assets/images/logo.png" alt=""/>
            </v-avatar>
          </a>
          <h5 class="mb-1 font-weight-regular footer-color ">{{ $t('slogan') }}</h5>
          <div class="text-12 footer-color">{{ $t('slogan2') }}</div>
          <div class="text-12 footer-color">{{ $t('foodFactoryLicense') }}: 0397802900</div>
          <!--          <div class="d-flex flex-wrap ">
                      <v-avatar class="me-4" tile width="120" height="45">
                        <img src="~/assets/images/google-play.png" alt="">
                      </v-avatar>
                      <v-avatar tile width="120" height="45">
                        <img src="~/assets/images/app-store.png" alt="">
                      </v-avatar>
                    </div>-->
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <h2 class="f-600 mb-4">{{ $t('about') }}MyFridge</h2>
          <div class="d-flex flex-column">
            <nuxt-link to="/about/About" class="footer-link">
              {{ $t('aboutUs') }}
            </nuxt-link>
            <nuxt-link to="/about/Jobs" class="footer-link">
              {{ $t('vacancies') }}
            </nuxt-link>
            <nuxt-link to="/about/TermsAndConditions" class="footer-link">
              {{ $t('termsAndConditions') }}
            </nuxt-link>
            <nuxt-link to="/about/PrivacyPolicy" class="footer-link">
              {{ $t('privacyPolicy') }}
            </nuxt-link>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <h2 class="f-600 mb-4">{{ $t('customerService') }}</h2>
          <div class="d-flex flex-column">
            <nuxt-link to="/partners" class="footer-link">
              {{ $t('partners') }}
            </nuxt-link>
            <nuxt-link to="/service/QNA" class="footer-link">
              {{ $t('Q&A') }}
            </nuxt-link>
            <nuxt-link to="/service/B2B" class="footer-link">
              {{ $t('businessCooperation') }}
            </nuxt-link>
            <nuxt-link to="/retails" class="footer-link">
              {{ $t('retailStores') }}
            </nuxt-link>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <!--          <h2 class="f-600 mb-4">{{ $t('memberChannel') }}</h2>
                    <div class="d-flex flex-column">
                      <v-btn class="me-2" fab dark x-small color="secondary" href="https://whatsapp.com/channel/0029VaRT7FuKrWQvxiqtiQ3R" target="_blank" rel="noopener">
                        <v-icon dark>{{ icons.mdiAccountGroup }}</v-icon>
                      </v-btn>
                    </div>-->
          <h2 class="mt-8 f-600 mb-4">{{ $t('contactUs') }}</h2>
          <div class="d-flex flex-column">
            <!--            <p class="mb-3 footer-color">葵涌華發工業大廈5樓503室</p>-->
            <div class="d-flex flex-wrap">
              <v-btn class="me-2" fab dark x-small color="secondary" href="https://wa.me/+85265657682" target="_blank" rel="noopener">
                <v-icon dark>{{ icons.mdiWhatsapp }}</v-icon>
              </v-btn>
              <v-btn class="me-2" fab dark x-small color="secondary" href="https://www.facebook.com/myfridgehk" target="_blank" rel="noopener">
                <v-icon dark>{{ icons.mdiFacebook }}</v-icon>
              </v-btn>
              <v-btn class="me-2" fab dark x-small color="secondary" href="https://www.instagram.com/myfridge_hk" target="_blank" rel="noopener">
                <v-icon dark>{{ icons.mdiInstagram }}</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>

        <v-col cols="12" class="mt-3 d-flex justify-lg-center justify-md-center justify-start py-0 flex-wrap">
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/visa.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/master.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/americanexpress.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/unoinpay_icon.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/jcb_icon.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/applepay.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/googlepay.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/paypal.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/payme.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/wechatpay.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/alipay.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/octopus_1.png')"></v-img>
          <v-img max-width="39" class="mr-2 mb-2" contain :src="require('~/assets/images/payment_icons/fps.png')"></v-img>
        </v-col>

        <v-col cols="12" class="mt-3 d-flex justify-center align-center">
          <div class="d-flex align-center">
            <v-icon>{{ icons.mdiEarth }}</v-icon>
            <a @click="setLocale('zh')" class="footer-link mr-1 mb-0">繁體中文</a> |
            <a @click="setLocale('en')" class="footer-link ml-1 mb-0">English</a>
          </div>
        </v-col>


        <v-col cols="12" class="mt-8 d-flex justify-center align-center">
          <div class="d-flex align-center">
            <div>{{ $t('region') }}:</div>
            <a v-for="(country,index) in regions" :href="country.link" class="footer-link ml-1 mb-0">{{ country[$i18n.locale] }}{{ index >= 0 && index < regions.length - 1 ? ', ' : '' }}</a>
          </div>
        </v-col>
        <v-col cols="12 text-12 text-center pt-3">myfridgehk.com is owned and used by 滿記凍肉有限公司.<br>
          Copyright © 2015-{{ moment().format('YYYY') }}. All rights reserved.
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>
import {mdiAccountGroup, mdiEarth, mdiFacebook, mdiInstagram, mdiWhatsapp} from "@mdi/js"
import moment                                                              from "moment";
import Cookies                                                             from "js-cookie";

export default {
  methods : {
    setLocale (lang) {
      this.$i18n.setLocale(lang)
      Cookies.set('locale', lang, { expires : 360 })
      return true
    },
  },
  data    : () => ({
    moment,
    icons   : {
      mdiFacebook,
      mdiInstagram,
      mdiEarth,
      mdiWhatsapp,
      mdiAccountGroup
    },
    regions : [
      {
        zh   : '香港',
        en   : 'Hong Kong',
        link : 'https://myfridgehk.com'
      }
    ]
  })
}
</script>
