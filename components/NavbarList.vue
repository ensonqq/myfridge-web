<template>
  <div>
    <v-navigation-drawer width="300" v-model="navDrawer" fixed temporary :stateless="!!(loginModal)">
      <!-- <v-app-bar-nav-icon tile dark @click="drawer = true"></v-app-bar-nav-icon> -->
      <div class="d-flex justify-space-between flex-wrap align-center ps-4 pe-3 mt-3">
        <div class="m-0 col-11 px-0 d-flex align-center">
          <img class="weblogo" src="../assets/images/logo.png"/>
        </div>
        <div class="col-1 px-0 align-self-start" style="margin-top: -20px;">
          <v-btn icon @click.stop="navDrawer = !navDrawer">
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </v-btn>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="navbar-scroll pt-0">
        <v-list class="pt-0">
          <v-list-item @click.stop="toggleTopUpCreditsDialog(true)" v-if="topupCredits.length">
            <v-list-item-icon class="shake">
              <v-icon color="red">{{ icons.mdiFire }}</v-icon>
              <!--              <v-img class="mr-1" max-width="25" contain :src="require('~/assets/images/xmas_hat.png')"></v-img>-->
            </v-list-item-icon>
            <v-list-item-title class="amber--text text--darken-4" style="margin-left: -30px">{{ $t('topupButton') }}</v-list-item-title>
          </v-list-item>

          <!--     user credit    -->
          <template v-if="user.id">
            <v-list-item @click.prevent v-if="user.vipTier === 'normal'">
              <div class="d-flex flex-wrap my-2">
                <div>
                  {{ $t('exp') }}:
                </div>
                <div class="ml-2 flex-grow-1">
                  <v-progress-linear rounded :value="Math.floor(user.totalSpent / 1500 * 100)" color="amber accent-3" height="25">
                    <div class="d-flex align-center">
                      <span class="text-13">{{ user.totalSpent }}/1500</span>
                      <v-icon class="me-0 me-sm-3 amber--text text--darken-3">{{ icons.mdiCrown }}</v-icon>
                    </div>
                  </v-progress-linear>
                </div>
                <div class="text-12 font-weight-light col-12 px-0 py-0 align-center">*{{ $t('upgradeAtSpent', { spent : 1500 }) }}
                  <v-icon class="amber--text text--accent-4" style="margin-top: -3px;" small>{{ icons.mdiCrown }}</v-icon>
                  {{ $t('goldMemberDiscount') }} (<i @click="vipTierDetail()" class="cursor-pointer amber--text text--darken-3">{{ $t('clickForMore') }}</i>)
                </div>
              </div>
            </v-list-item>
            <v-list-item @click.prevent v-if="user.vipTier === 'gold'">
              <div class="d-flex flex-wrap my-2">
                <div>
                  {{ $t('exp') }}:
                </div>
                <div class="ml-2 flex-grow-1">
                  <v-progress-linear rounded :value="Math.floor(user.totalSpent / 5000 * 100)" color="deep-purple lighten-3" height="25">
                    <div class="d-flex align-center">
                      <span class="text-13">{{ user.totalSpent }}/5000</span>
                      <v-icon class="me-0 me-sm-3 deep-purple--text text--lighten-1">{{ icons.mdiDiamondStone }}</v-icon>
                    </div>
                  </v-progress-linear>
                </div>
                <div class="text-12 font-weight-light col-12 px-0 py-0 align-center">*{{ $t('upgradeAtSpent', { spent : 5000 }) }}
                  <v-icon class="deep-purple--text text--lighten-1" style="margin-top: -3px;" small>{{ icons.mdiDiamondStone }}</v-icon>
                  {{ $t('diamondMemberX3credits') }} (<i @click="vipTierDetail()" class="cursor-pointer deep-purple--text text--darken-3">{{ $t('clickForMore') }}</i>)
                </div>
              </div>
            </v-list-item>
            <v-list-item @click.prevent>
              <v-list-item-title class="shorten-profile my-2">
                <div class="d-flex align-center justify-space-between py-2">
                  <div>
                    <div class="d-flex flex-column justify-center" v-if="user.vipTier === 'gold'" @click="vipTierDetail">
                      <div class="amber--text text--accent-4 d-flex align-center">
                        <v-icon class="amber--text text--accent-4">{{ icons.mdiCrown }}</v-icon>
                        {{ $t('goldMember') }}
                      </div>
                      <div class="text-11 pb-2">{{ $t('$1discountForAllProducts') }}</div>
                    </div>
                    <div class="d-flex flex-column justify-center" v-if="user.vipTier === 'diamond'" @click="vipTierDetail">
                      <div class="deep-purple--text text--darken-3 d-flex align-center">
                        <v-icon class="deep-purple--text text--lighten-1">{{ icons.mdiDiamondStone }}</v-icon>
                        {{ $t('diamondMember') }}
                      </div>
                      <div class="text-11">{{ $t('$1discountForAllProducts') }}</div>
                      <div class="text-11 pb-2">{{ $t('x3credits') }}</div>
                    </div>
                    <div style=" " class="nav-user-name">
                      {{ user.name }}<br>{{ $t('credits') }}: {{ user.credits }}
                    </div>
                  </div>
                  <v-btn depressed text class="ml-auto px-0" @click.stop="logoutClicked">
                    <v-icon>{{ icons.mdiLogout }}</v-icon>
                    {{ $t('logout') }}
                  </v-btn>
                </div>
                <div v-if="user.isStudent">
                  <template class="text-12" v-if="user.student.status === 'pending'">
                    ({{ $t('studentAwaitingVerification') }})
                  </template>
                  <template class="text-12" v-else-if="user.student.status === 'rejected'">
                    ({{ $t('studentDenied') }})
                  </template>
                  <template class="text-12 d-flex flex-column justify-center align-start" v-else>
                    <v-icon size="20">{{ icons.mdiAccountSchool }}</v-icon>
                    {{ $t('studentAccount') }}
                  </template>
                </div>
              </v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item v-else @click.stop="toggleLoginModal(true)">
            <v-list-item-icon>
              <v-icon>{{ icons.mdiLogin }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('memberLogin') }}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>{{ icons.mdiStore }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('shop') }}</v-list-item-title>
          </v-list-item>

          <v-list-item @click="navDrawer=false;toggleShoppingCartDrawer(true)">
            <v-list-item-icon>
              <v-icon>{{ icons.mdiCartOutline }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('cart') }}({{ getCheckOutQty() }})</v-list-item-title>
          </v-list-item>

          <!--     sub items     -->
          <v-list-group :prepend-icon="icons.mdiAccountCircleOutline"
                        :append-icon="icons.mdiMenuDown"
                        no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ $t('myAccount') }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/dashboard/Account">
              <v-list-item-title>{{ $t('myAccount') }}</v-list-item-title>
            </v-list-item>

            <v-list-item to="/dashboard/OrderList">
              <v-list-item-title>{{ $t('myOrders') }}</v-list-item-title>
            </v-list-item>
            <v-list-item to="/dashboard/TopupList">
              <v-list-item-title>{{ $t('topupRecords') }}</v-list-item-title>
            </v-list-item>

            <!--            <v-list-item to="#" @click.stop="logoutClicked">-->
            <!--              <v-list-item-title>{{ $t('logout') }}</v-list-item-title>-->
            <!--            </v-list-item>-->
          </v-list-group>

          <!--     sub items     -->
          <v-list-group :prepend-icon="icons.mdiAccountGroup"
                        :append-icon="icons.mdiMenuDown"
                        no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ $t('about') }} myfridge</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/about/About">
              <v-list-item-title>{{ $t('aboutUs') }}</v-list-item-title>
            </v-list-item>

            <v-list-item to="/about/Jobs">
              <v-list-item-title>{{ $t('vacancies') }}</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <!--     sub items     -->
          <v-list-group :prepend-icon="icons.mdiFaceAgent"
                        :append-icon="icons.mdiMenuDown"
                        no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ $t('customerService') }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item to="/service/QNA">
              <v-list-item-title>{{ $t('Q&A') }}</v-list-item-title>
            </v-list-item>

            <!--            <v-list-item to="/service/KnowMore">-->
            <!--              <v-list-item-title>購買需知</v-list-item-title>-->
            <!--            </v-list-item>-->

            <v-list-item to="/service/B2B">
              <v-list-item-title>{{ $t('businessCooperation') }}</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-item to="/partners">
            <v-list-item-icon>
              <v-icon>{{ icons.mdiHandshakeOutline }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('partners') }}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/about/VipAdvantage">
            <v-list-item-icon>
              <v-icon>{{ icons.mdiCrown }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('memberJetso') }}</v-list-item-title>
          </v-list-item>

          <v-list-item to="/retails">
            <v-list-item-icon>
              <v-icon>{{ icons.mdiSitemap }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('retailStores') }}</v-list-item-title>
          </v-list-item>

          <!--          <v-list-item to="/about/TermsAndConditions">
                      <v-list-item-icon>
                        <v-icon>{{ icons.mdiTextBoxOutline }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>{{ $t('termsAndConditions') }}</v-list-item-title>
                    </v-list-item>-->
          <!--          <v-list-item to="/about/PrivacyPolicy">
                      <v-list-item-icon>
                        <v-icon>{{ icons.mdiEyeCheckOutline }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>{{ $t('privacyPolicy') }}</v-list-item-title>
                    </v-list-item>-->
        </v-list>
        <v-list-group :prepend-icon="icons.mdiEarth"
                      :append-icon="icons.mdiMenuDown"
                      no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ $t('languages') }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item @click="setLocale('zh')">
            <v-list-item-title>繁體中文</v-list-item-title>
          </v-list-item>

          <v-list-item @click="setLocale('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>

          <!--            <v-list-item to="#" @click.stop="logoutClicked">-->
          <!--              <v-list-item-title>{{ $t('logout') }}</v-list-item-title>-->
          <!--            </v-list-item>-->
        </v-list-group>
      </div>
    </v-navigation-drawer>
    <VipTierDialog ref="VipTierDialog"></VipTierDialog>
  </div>

</template>

<script>
import {mapMutations, mapState} from "vuex"
import Cookies                  from 'js-cookie'
import {
  mdiAccountCircleOutline,
  mdiClose,
  mdiCartOutline,
  mdiAccountGroup,
  mdiFaceAgent,
  mdiTextBoxOutline,
  mdiKeyStar, mdiMenuDown,
  mdiEyeCheckOutline,
  mdiLogin,
  mdiLogout,
  mdiHandshakeOutline,
  mdiStore, mdiAccountSchool, mdiCrown, mdiSitemap, mdiFire, mdiEarth, mdiDiamondStone
}                               from "@mdi/js"

export default {
  props    : ['light', 'text', 'classes', 'tile', 'dark'],
  computed : {
    ...mapState(['user', 'cart', 'loginModal', 'topupCredits']),
    navDrawer : {
      ...mapState({ get : 'navDrawer' }),
      ...mapMutations({ set : 'toggleNavDrawer' }),
    },
  },
  methods  : {
    ...mapMutations(['toggleShoppingCartDrawer', 'logout', 'toggleLoginModal', 'toggleTopUpCreditsDialog']),
    setLocale (lang) {
      this.$i18n.setLocale(lang)
      Cookies.set('locale', lang, { expires : 360 })
      return true
    },
    async vipTierDetail () {
      await this.$refs.VipTierDialog.open()
    },
    getCheckOutQty () {
      const qty = _.sumBy(this.cart, function (item) {
        return item.quantity
      })
      return qty
    },
    async logoutClicked () {
      this.logout()
      await this.$api.myCart()
      await this.$api.getMyPrize()
    }
  },
  data () {
    return {
      icons : {
        mdiAccountCircleOutline,
        mdiClose,
        mdiCartOutline,
        mdiAccountGroup,
        mdiFaceAgent,
        mdiTextBoxOutline,
        mdiKeyStar,
        mdiMenuDown,
        mdiEyeCheckOutline,
        mdiLogin,
        mdiLogout,
        mdiStore,
        mdiAccountSchool,
        mdiCrown,
        mdiHandshakeOutline,
        mdiSitemap,
        mdiFire,
        mdiEarth,
        mdiDiamondStone
      },
      group : null,
    }
  }
}
</script>
