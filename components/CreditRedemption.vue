<template>
  <v-dialog v-model="dialog" fullscreen scrollable @close="close" persistent>
    <v-card min-height="80vh" color="indigo darken-4" dark class="overflow-x-hidden">
      <v-card-title class="d-flex align-center justify-center py-2">
        <v-img class="weblogo" max-width="40" :src="require('~/assets/images/logo.png')"></v-img>
        <div class="pl-4">{{ $t('creditRedemption') }}</div>
        <v-btn class="ml-auto" icon color="grey lighten-2" @click.stop="close">{{ $t('close') }}</v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="user-select: none !important;">
        <v-row class="py-4" v-if="!user.id" justify="center" align="center">
          <v-col cols="12" lg="4" md="8">
            <v-card color="white" light>
              <v-form class="mt-16 pa-5" @submit.prevent="login" ref="loginForm" v-model="loginValidation" lazy-validation>
                <div class="text-center weblogo"><img src="~/assets/images/logo.png" alt="" width="100" height="100"/></div>
                <h2 class="mb-2 text-center">{{ $t('memberLogin') }}</h2>

                <p class="text-14 mb-1">{{ $t('account(email)') }}</p>
                <v-text-field class="mb-4"
                              outlined dense hide-details
                              v-model="loginData.email"
                              :rules="[$validations.required, $validations.email]"></v-text-field>

                <p class="text-14  mb-1">{{ $t('password') }}</p>
                <v-text-field type="password"
                              class="mb-4"
                              outlined dense hide-details
                              v-model="loginData.password"
                              :rules="[$validations.required]"></v-text-field>

                <v-btn type="submit" block color="secondary white--text" class="text-capitalize font-600" :loading="loadingLogin">{{ $t('login') }}</v-btn>
                <v-col cols="12" class="error--text text-center">{{ message }}</v-col>
                <v-col cols="10" lg="8" class="mx-auto">
                  <div class="d-flex align-center my-1">
                    <v-divider></v-divider>
                    <span class="mx-4">© MyFridge</span>
                    <v-divider></v-divider>
                  </div>
                </v-col>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="py-4" v-else-if="checkingAvailability">
          <v-col cols="12" class="text-h4 text-center">
            <div class="pt-16 d-flex justify-center">
              <v-img class="mt-16 spinlogo weblogo" max-width="100" :src="require('~/assets/images/logo.png')"></v-img>
            </div>
            <div class="py-4 text-14">{{ $t('loading') }}...</div>
          </v-col>
          <v-col>
            <div class="amber--text text-center">{{ message }}</div>
          </v-col>
        </v-row>
        <v-row class="py-4" v-else-if="available && creditRedemption">
          <v-col cols="12" class="text-h4 text-center">
            <div class="text-h1 pt-16" :style="'font-size: ' + ($i18n.locale === 'en'? '5rem !important' : '') +';'">{{ creditRedemption.credits }}{{ $t('credits') }}</div>
            <div class="py-4">{{ $t('firstComeFirst') }}</div>
            <div class="py-4">{{ $t('beatTheClock') }}</div>
          </v-col>
          <v-col cols="12">
            <div class="chickenoregg">
              <svg viewbox="-1 -5 150 150">
                <g transform="matrix(1,0,0,1,-393,-186.067)">
                  <g transform="matrix(1,0,0,1,105,-107.933)">
                    <path>
                      <animate
                        attributeName="d"
                        dur="6200ms"
                        repeatCount="indefinite"
                        values="
				           M311,348L316,344L317.909,338.728L315,334L319.975,334.646L321.67,326.435L326.358,332.283L334.421,327.49L330.535,334.366L338,341L345,356L374,365L400,344.982L413,344L406.823,353L407.508,359.466L400,357.363L405.705,367.344L395.734,366.58L402.836,374.862L392.173,376.058L396,388.202L389.356,381.697L377.448,402.589L368.372,408.999L358.593,429.431L343.999,429.018L356.62,424.208L353.175,415.919L319.412,405.677L308,381L312.994,362.798L314.86,356L322.374,349L311,348Z;
				           M311,348L316,344L317.909,338.728L315,334L319.975,334.646L321.67,326.435L326.358,332.283L334.421,327.49L330.535,334.366L338,341L345,356L374,365L400,344.982L413,344L406.823,353L407.508,359.466L400,357.363L405.705,367.344L395.734,366.58L402.836,374.862L392.173,376.058L396,388.202L389.356,381.697L377.448,402.589L368.372,408.999L358.593,429.431L343.999,429.018L356.62,424.208L353.175,415.919L319.412,405.677L308,381L312.994,362.798L314.86,356L322.374,349L311,348Z;

				           M292,357L295,347L298.909,338.728L303,330L308,321.646L314,312.435L321.358,304.933L326.421,300.49L334.535,296.366L345,295L356,296L366,301L377,310.982L387,324L393.823,336L397.508,345.466L400,352.363L401.705,362.344L402.734,369.58L401.836,377.933L400.173,388.058L398,396.202L393.356,404.697L386.448,413.589L375.372,422.999L358.593,429.431L341.999,431.018L324.62,427.208L312.175,419.919L298,405.677L292,393L290,386.798L289,377.933L290,368L292,357Z;
				           M292,357L295,347L298.909,338.728L303,330L308,321.646L314,312.435L321.358,304.933L326.421,300.49L334.535,296.366L345,295L356,296L366,301L377,310.982L387,324L393.823,336L397.508,345.466L400,352.363L401.705,362.344L402.734,369.58L401.836,377.933L400.173,388.058L398,396.202L393.356,404.697L386.448,413.589L375.372,422.999L358.593,429.431L341.999,431.018L324.62,427.208L312.175,419.919L298,405.677L292,393L290,386.798L289,377.933L290,368L292,357Z;

				           M311,348L316,344L317.909,338.728L315,334L319.975,334.646L321.67,326.435L326.358,332.283L334.421,327.49L330.535,334.366L338,341L345,356L374,365L400,344.982L413,344L406.823,353L407.508,359.466L400,357.363L405.705,367.344L395.734,366.58L402.836,374.862L392.173,376.058L396,388.202L389.356,381.697L377.448,402.589L368.372,408.999L358.593,429.431L343.999,429.018L356.62,424.208L353.175,415.919L319.412,405.677L308,381L312.994,362.798L314.86,356L322.374,349L311,348Z;

				           M311,348L316,344L317.909,338.728L315,334L319.975,334.646L321.67,326.435L326.358,332.283L334.421,327.49L330.535,334.366L338,341L345,356L374,365L400,344.982L413,344L406.823,353L407.508,359.466L400,357.363L405.705,367.344L395.734,366.58L402.836,374.862L392.173,376.058L396,388.202L389.356,381.697L377.448,402.589L368.372,408.999L358.593,429.431L343.999,429.018L356.62,424.208L353.175,415.919L319.412,405.677L308,381L312.994,362.798L314.86,356L322.374,349L311,348Z"
                      />
                    </path>
                  </g>
                </g>
              </svg>
            </div>
          </v-col>
          <v-col>
            <div class="amber--text text-center">{{ message }}</div>
          </v-col>
        </v-row>
        <v-row class="py-4" v-else>
          <v-col cols="12" class="text-h4 text-center">
            <div class="text-h1 pt-16 grey--text text--lighten-1">{{ $t('sorry') }}</div>
            <div class="pt-4 grey--text text--lighten-1">{{ $t('allGivenOut') }}</div>
            <div class="pt-4 grey--text text--lighten-1">{{ $t('goodLuckNextTime') }}</div>
          </v-col>
          <v-col cols="12" class="d-flex align-center justify-center">
            <v-icon size="280" color="grey lighten-1">{{ icons.mdiWeightLifter }}</v-icon>
          </v-col>
          <v-col>
            <div class="amber--text text-center">{{ message }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="py-2">
        <v-btn color="blue lighten-3" x-large light :loading="loading" v-if="available" block @click="redeem">{{ $t('redeemNow') }}</v-btn>
        <v-btn color="grey darken-4" x-large dark :loading="loading" v-else block @click="close">{{ $t('close') }}</v-btn>
      </v-card-actions>
    </v-card>
    <SignIn ref="SignIn"></SignIn>
  </v-dialog>
</template>

<script>
import {mapMutations, mapState}          from "vuex";
import moment                            from 'moment'
import {mdiSignCaution, mdiWeightLifter} from "@mdi/js";

export default {
  name     : "CreditRedemption",
  computed : {
    ...mapState(['user', 'snackbarMessages']),
  },
  async mounted () {
    const self = this
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('cd');
    if (code) {
      self.code = code
      self.dialog = true
      if (this.user.id) {
        await self.checkAvailability()
      }
    }
  },
  methods : {
    ...mapMutations(['pushSnackbarMessages', 'toggleLoginModal', 'setUser', 'setTokens']),

    close () {
      this.reset()
    },

    async checkAvailability () {
      const self = this
      try {
        const result = await this.$api.get('/v1/creditRedemptions/checkAvailability/' + this.code)
        if (result && result.data) {
          self.available = true
          self.creditRedemption = result.data
        }
      } catch (e) {
        console.log(e)
      } finally {
        self.checkingAvailability = false
      }
      return
    },

    async openSignInDialog (step) {
      await this.$refs.SignIn.open(step, true)
    },

    async login () {
      try {
        this.loadingLogin = true
        if (!this.$refs.loginForm.validate()) return

        const response = await this.$api.post('/v1/auth/login', this.loginData)
        if (response.data) {
          this.setUser(response.data.user)
          this.setTokens(response.data.tokens)
          //initialize user shopping cart when logged in
          await this.$api.myCart()
          await this.$api.myProfile(true)
          await this.checkAvailability()
        }
      } catch (error) {
        if (error.response && error.response.data) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          this.message = error.response.data.message
        }

        console.log(error)
      } finally {
        this.loadingLogin = false
      }
    },

    reset () {
      this.dialog = false
      this.checkingAvailability = true
      this.available = false
      self.code = null
      this.creditRedemption = null
    },

    async redeem () {
      try {
        this.loading = true
        const result = await this.$api.post('/v1/creditRedemptions/redeem/' + this.creditRedemption.uniqueId)
        if (result && result.data) {
          await this.$api.myProfile(true)
          this.pushSnackbarMessages(this.$t('successfullyRedeemCreditMsg', {
            credits : result.data.credits, totalCredits : this.user.credits
          }))
          this.close()
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.pushSnackbarMessages(error.response.data.message)
        } else {
          this.pushSnackbarMessages(error.toString())
        }
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },

  data : () => ({
    loginValidation : true,
    loginData       : {
      email    : '',
      password : '',
    },
    loadingLogin    : false,


    code                 : null,
    creditRedemption     : null,
    moment,
    message              : '',
    available            : false,
    creditInfo           : null,
    dialog               : false,
    loading              : false,
    checkingAvailability : true,
    icons                : {
      mdiSignCaution,
      mdiWeightLifter
    }
  })
}
</script>
<style lang="scss" scoped>
.spinlogo {
  animation: spin 3s infinite;
}

.chickenoregg {
  /*   padding: 5%; */
  display: block;
  justify-content: center;
  max-width: 100%;
  height: 300px;
  overflow: hidden !important;
  margin: 0 auto;
  text-align: center;
}

svg {
  background-color: none !important;
  transform: scale(2);
  transform-origin: -23px -4px;
  max-width: 100%;
  overflow-x: hidden !important;
}

path {
  fill: #FD5F00;
  stroke: black;
  stroke-width: 2px;
}

path {
  &.dim {
    fill: #a7a7a7;
    stroke: black;
    stroke-width: 2px;
  }
}

@keyframes spin {
  0% {
    transform: perspective(224px) rotateY(0deg);
  }
  10% {
    transform: perspective(224px) rotateY(-65deg);
  }
  90%, 100% {
    transform: perspective(224px) rotateY(1800deg);
  }
}
</style>
