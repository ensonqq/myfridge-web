<template>
  <div>
    <v-menu top v-if="user.id" nudge-bottom="135" origin="center center" text transition="slide-y-transition" :close-on-click="true" :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text :dark="dark" v-bind="attrs" v-on="on">
          <v-icon v-if="user.vipTier === 'gold'" class="me-0 me-sm-3 amber--text text--accent-4">{{ icons.mdiAccountHardHat }}</v-icon>
          <v-icon v-else-if="user.vipTier === 'diamond'" class="me-0 me-sm-3 deep-purple--text text--lighten-1">{{ icons.mdiAccountHardHat }}</v-icon>
          <v-icon class="me-0 me-sm-3" v-else>{{ icons.mdiAccountCircleOutline }}</v-icon>
          <span class="d-none d-sm-block">{{ user.name }}</span>
        </v-btn>
      </template>

      <v-list dense width="250">
        <v-list-item>
          <div class="d-flex flex-column col-12 px-0 py-1">
            <div class="font-weight-bold">
              <div v-if="user.vipTier === 'gold'" class="d-flex align-center">
                <v-icon class="amber--text text--accent-4">{{ icons.mdiCrownCircleOutline }}</v-icon>
                <span @click="vipTierDetail" class="amber--text text--accent-4 cursor-pointer">{{ $t('goldMember') }}</span>
              </div>
              <div v-else-if="user.vipTier === 'diamond'" class="d-flex align-center">
                <v-icon class="deep-purple--text text--lighten-1">{{ icons.mdiDiamondStone }}</v-icon>
                <span @click="vipTierDetail" class="deep-purple--text text--lighten-1 cursor-pointer">{{ $t('diamondMember') }}</span>
              </div>
              <div class="d-flex align-center pt-1">
                <div>{{ user.name }}</div>
              </div>
            </div>
            <div class="font-weight-bold">
              {{ user.email }}
              <v-chip v-if="user.isEmailVerified" x-small color="green darken-3" dark>{{ $t('verified') }}</v-chip>
              <template v-else>
                <v-chip x-small color="amber">{{ $t('unverified') }}</v-chip>
                <a class="text-12 text-decoration-underline" @click.stop.prevent="emailVerification">{{ $t('verifyNow') }}</a>
              </template>
            </div>
            <hr class="my-1" color="#ddd" size="1">
            <div class="font-weight-bold d-flex flex-wrap align-center py-1" v-if="user.vipTier === 'normal'">
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
              <div class="text-12 font-weight-light col-12 px-0 py-0 align-center">{{ $t('upgradeAtSpent', { spent : 1500 }) }}
                <v-icon class="amber--text text--accent-4" style="margin-top: -3px;" small>{{ icons.mdiCrown }}</v-icon>
                {{ $t('goldMember') }}，{{ $t('$1discountForAllProducts') }} (<i @click="vipTierDetail()" class="cursor-pointer amber--text text--darken-3">{{ $t('clickForMore') }}</i>)
              </div>
            </div>
            <div class="font-weight-bold d-flex flex-wrap align-center py-1" v-if="user.vipTier === 'diamond'">
              <div class="text-12 font-weight-light col-12 px-0 py-0 align-center">
                - {{ $t('$1discountForAllProducts') }}
                <br>- {{ $t('x3credits') }}
                <br>(<i @click="vipTierDetail()" class="cursor-pointer deep-purple--text text--darken-3">{{ $t('clickForMore') }}</i>)
              </div>
            </div>
            <div class="font-weight-bold d-flex flex-wrap align-center py-1" v-if="user.vipTier === 'gold'">
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
              <div class="text-12 font-weight-light col-12 px-0 py-0 align-center">{{ $t('upgradeAtSpent', { spent : 5000 }) }}
                <v-icon class="deep-purple--text" style="margin-top: -3px;" small>{{ icons.mdiDiamondStone }}</v-icon>
                {{ $t('diamondMember') }}
                <br>- {{ $t('$1discountForAllProducts') }}
                <br>- {{ $t('x3credits') }}
                <br>(<i @click="vipTierDetail()" class="cursor-pointer deep-purple--text text--darken-3">{{ $t('clickForMore') }}</i>)
              </div>
            </div>
            <hr class="my-1" color="#ddd" size="1">
            <div class="text-12 grey--text text--darken-2" v-if="user.isStudent">
              <span class="text-12" v-if="user.student.status === 'pending'">
                ({{ $t('studentAwaitingVerification') }})
              </span>
              <span class="text-12 error--text" v-else-if="user.student.status === 'rejected'">
                ({{ $t('studentDenied') }}，{ $t('resubmitStudentApplication') }})
              </span>
              <template class="text-12 d-flex flex-column justify-center align-start" v-else>
                <div>
                  <v-icon size="20">{{ icons.mdiAccountSchool }}</v-icon>
                  {{ $t('studentAccount') }}
                </div>
              </template>
            </div>
          </div>
        </v-list-item>
        <v-list-item>
          <div class="d-flex justify-end text-14">
            {{ $t('creditsYouHave') }}: {{ user.credits }}
          </div>

          <v-btn v-if="topupCredits.length" x-small @click="toggleTopUpCreditsDialog(true)" outlined depressed color="amber darken-3" class="position-relative ml-1">
            <span class="shake">
              <v-icon color="red">{{ icons.mdiFire }}</v-icon>
<!--              <v-img class="mr-1" max-width="25" contain :src="require('~/assets/images/xmas_hat.png')"></v-img>-->
            </span>
            {{ $t('topupButton') }}
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block color="secondary" depressed to="/dashboard/Account">
            {{ $t('myAccount') }}
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block color="secondary" depressed to="/dashboard/OrderList">
            {{ $t('myOrders') }}
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block color="secondary" depressed to="/dashboard/TopupList">
            {{ $t('topupRecords') }}
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn block color="secondary" depressed @click="logoutClicked">
            {{ $t('logout') }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn v-else :dark="dark" text @click="toggleLoginModal(true)" class="px-0">
      <v-icon>{{ icons.mdiAccountCircleOutline }}</v-icon>
      <span class="d-none d-sm-block" v-if="user.id">{{ $t('account') }}</span>
      <span class="d-none d-sm-block" v-else>{{ $t('login') }}</span>
    </v-btn>

    <VipTierDialog ref="VipTierDialog"></VipTierDialog>
    <ConfirmDialog ref="ConfirmDialog"></ConfirmDialog>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {
  mdiAccountCircleOutline,
  mdiAccount,
  mdiAccountHardHatOutline,
  mdiBitcoin,
  mdiAccountSchool,
  mdiCrownCircleOutline,
  mdiAccountHardHat,
  mdiCrown, mdiFire, mdiEmail, mdiDiamondStone
}                               from '@mdi/js'

export default {
  props    : ['dark'],
  name     : "AccountButton",
  computed : {
    ...mapState(['loginModal', 'user', 'topupCredits'])
  },
  methods  : {
    ...mapMutations(['toggleLoginModal', 'logout', 'toggleTopUpCreditsDialog', 'pushSnackbarMessages']),
    async logoutClicked () {
      this.logout()
      await this.$api.myCart()
      await this.$api.getMyPrize()
    },
    async vipTierDetail () {
      await this.$refs.VipTierDialog.open()
    },
    async emailVerification () {
      const confirm = await this.$refs.ConfirmDialog.open(this.$t('emailVerification'), `${ this.$t('youAreVerifyingEmail') }: ${ this.user.email }，${ this.$t('emailVerificationBonusTip') }`, mdiEmail)
      if (!confirm) return

      document.body.classList.add('loading')
      try {
        const verifyEmail = await this.$api.post('/v1/auth/send-verification-email')
        if (verifyEmail && verifyEmail.data) {
          this.pushSnackbarMessages(this.$t('emailVerificationSent'))
        } else {
          this.pushSnackbarMessages(this.$t('emailVerificationFailed'))
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.pushSnackbarMessages(error.response.data.message)
        } else {
          this.pushSnackbarMessages(this.$t('emailVerificationFailed'))
        }
      } finally {
        document.body.classList.remove('loading')
      }
      //  TODO email verification
    },
  },
  data () {
    return {
      icons : {
        mdiAccountCircleOutline,
        mdiBitcoin,
        mdiAccountSchool,
        mdiAccountHardHatOutline,
        mdiCrownCircleOutline,
        mdiDiamondStone,
        mdiCrown,
        mdiAccount,
        mdiAccountHardHat,
        mdiFire
      }
    }
  }
}
</script>
