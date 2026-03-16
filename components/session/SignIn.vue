<template>
  <v-dialog width="500" v-model="loginModal" persistent :fullscreen="step === 'registration'" :hide-overlay="step === 'registration'" :scrollable="step === 'registration'" @keydown.esc="close" @close="close" class="sign-in">
    <v-card class="position-relative" v-if="step === 'login'">
      <div class="px-3 px-md-10 py-8">
        <v-form @submit.prevent="login" ref="loginForm" v-model="loginValidation" lazy-validation>
          <div class="text-center"><img src="~/assets/images/logo_short.png" alt="" width="100" height="100"/>
          </div>
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

          <v-btn @click.prevent="login" type="submit" block color="secondary white--text" class="text-capitalize font-600" :loading="loadingLogin">{{ $t('login') }}</v-btn>
          <v-col cols="12" class="error--text text-center">{{ message }}</v-col>

          <v-col cols="10" lg="8" class="mx-auto">
            <div class="d-flex align-center my-1">
              <v-divider></v-divider>
              <span class="mx-4">© myfridge</span>
              <v-divider></v-divider>
            </div>
          </v-col>

        </v-form>
        <div class="text-14 text-center my-3">
          <v-btn color="secondary" @click="step='registration'" class="text-h6">{{ $t('register') }}</v-btn>
        </div>
      </div>
      <div class="py-1 bg-grey-light">
        <div class="text-center">
          <span class="grey--text text--darken-1">{{ $t('forgetPassword') }}? <v-btn @click="step='forgotPassword'" text class="ms-2 grey--text text--darken-4 font-600">{{ $t('resetNow') }}</v-btn></span>
        </div>
      </div>
      <v-btn icon
             tile
             class="closeBtn"
             @click="close">
        <v-icon>{{ icons.mdiClose }}</v-icon>
      </v-btn>
    </v-card>
    <v-card class="position-relative" v-else-if="step === 'registration'">
      <v-card-title class="px-2 pl-3 py-2">
        <v-img max-width="40" :src="require('~/assets/images/logo_short.png')" class="mr-3"></v-img>
        {{ $t('register') }}
        <v-btn icon
               class="ml-auto"
               @click="close">
          {{ $t('close') }}
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="px-3 px-md-10 py-8 ">
          <v-form @submit.prevent="register" ref="registrationForm" v-model="regValidation" lazy-validation>
            <v-img class="mx-auto my-4" :src="require('~/assets/images/logo_short.png')" alt="" max-width="128"/>
            <p class="text-h6 text-center">
              {{ $t('register') }}
            </p>
            <p class="text-14 mb-1">{{ $t('account(email)') }}</p>
            <v-text-field class="mb-4"
                          outlined dense hide-details
                          v-model="registrationData.email"
                          :rules="[$validations.required, $validations.email]"></v-text-field>

            <p class="text-14 mb-1">{{ $t('name') }}</p>
            <v-text-field class="mb-4"
                          outlined dense hide-details
                          v-model="registrationData.name"
                          :rules="[$validations.required]"></v-text-field>

            <p class="text-14  mb-1">{{ $t('password') }}</p>
            <v-text-field type="password"
                          class="mb-4"
                          outlined dense hide-details
                          v-model="registrationData.password"
                          :rules="[$validations.required]"></v-text-field>

            <p class="text-14  mb-1">{{ $t('reenterPassword') }}</p>
            <v-text-field type="password"
                          class="mb-4"
                          outlined dense hide-details
                          v-model="password2"
                          :rules="[$validations.required, (registrationData.password === password2) || $t('passwordNotMatch')]"></v-text-field>

            <p class="text-14  mb-1">{{ $t('gender') }}</p>
            <v-radio-group v-model="registrationData.gender" row :rules="[$validations.required]" hide-details class="mb-8">
              <v-radio :on-icon="icons.mdiRadioboxMarked"
                       :off-icon="icons.mdiRadioboxBlank" color="secondary" :label="$t('male')" value="m"></v-radio>
              <v-radio :on-icon="icons.mdiRadioboxMarked"
                       :off-icon="icons.mdiRadioboxBlank" color="secondary" :label="$t('female')" value="f"></v-radio>
            </v-radio-group>

            <div class="d-flex align-center">
              <v-checkbox v-model="registrationData.agreeTerms"
                          :rules="[$validations.required]"
                          class="ma-0 black--text"
                          color="secondary"
                          :on-icon="icons.mdiCheckboxMarked"
                          :off-icon="icons.mdiCheckboxBlankOutline"
                          hide-details>
                <template v-slot:label>
                  <div>
                    {{ $t('agreeToTermsOfUse') }}(<span class="cursor-pointer blue--text text--darken-3" @click.stop.prevent="showTerms('tnc')">{{ $t('T&C') }}</span>){{ $t('and') }}(<span @click.stop.prevent="showTerms('pp')" class="cursor-pointer blue--text text--darken-3">{{ $t('privacyPolicy') }}</span>)
                  </div>
                </template>
              </v-checkbox>
            </div>

            <!-- student registration option -->
            <!--            <v-checkbox v-model="registrationData.isStudent"
                                    v-if="enableStudentRegistration"
                                    class="mb-0 pb-0 black&#45;&#45;text"
                                    :label="$t('iamStudent')"
                                    color="secondary"
                                    :on-icon="icons.mdiCheckboxMarked"
                                    :off-icon="icons.mdiCheckboxBlankOutline"
                                    hide-details></v-checkbox>
                        <template v-if="registrationData.isStudent">
                          <ul class="text-12 mb-1 mt-0 pt-0 grey&#45;&#45;text text&#45;&#45;darken-1">
                            <li>{{ $t('imageUploadSizeLimit') }}: 8mbs</li>
                            <li>{{ $t('format') }}: gif, png{{ $t('and') }}jpg</li>
                            <li>{{ $t('1dayVerificationForStudents') }}</li>
                          </ul>
                          <ImageUpload @image="setImage" :error="imageError"></ImageUpload>
                        </template>-->
            <v-col cols="10" lg="8" class="mx-auto pt-10">
              <div class="d-flex align-center my-1">
                <v-divider></v-divider>
                <span class="mx-4">© myfridge</span>
                <v-divider></v-divider>
              </div>
            </v-col>

          </v-form>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex flex-wrap justify-space-between">
        <v-col cols="12" class="error--text text-center py-0">{{ message }}</v-col>
        <v-col cols="4">
          <v-btn block class="text-capitalize font-600" @click.prevent="step = 'login'" v-if="!hidePrevStepButton">{{ $t('backTo') }}{{ $t('prevStep') }}</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block @click.prevent="register" color="secondary" class="text-capitalize " :loading="loadingRegistration">{{ $t('register') }}</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
    <v-card class="position-relative" v-else>
      <div class="px-3 px-md-10 py-8">
        <v-form @submit.prevent="forgotPassword" ref="forgotPasswordForm" v-model="regValidation" lazy-validation>
          <div class="text-center weblogo"><img src="~/assets/images/logo.png" alt="" width="100" height="100"/></div>
          <h2 class="mb-2 text-center">{{ $t('forgetPassword') }}</h2>

          <p class="text-14 mb-1">{{ $t('account(email)') }}</p>
          <v-text-field class="mb-4"
                        outlined dense hide-details
                        v-model="forgotPasswordData.email"
                        :rules="[$validations.required, $validations.email]"></v-text-field>

          <v-btn type="submit" block color="secondary white--text" class="text-capitalize font-600" :loading="loadingForgotPassword">{{ $t('submit') }}</v-btn>
          <v-btn block class="text-capitalize font-600 mt-6" @click.prevent="step = 'login'" v-if="!hidePrevStepButton">{{ $t('backTo') }}{{ $t('prevStep') }}</v-btn>
          <v-col cols="12" class="error--text text-center">{{ message }}</v-col>
          <v-col cols="10" lg="8" class="mx-auto">
            <div class="d-flex align-center my-1">
              <v-divider></v-divider>
              <span class="mx-4">© myfridge</span>
              <v-divider></v-divider>
            </div>
          </v-col>

        </v-form>
      </div>
      <v-btn icon
             tile
             class="closeBtn"
             @click="close">
        <v-icon>{{ icons.mdiClose }}</v-icon>
      </v-btn>
    </v-card>
    <TermsDialog ref="TermsDialog"></TermsDialog>
  </v-dialog>
</template>
<script>

import {mapMutations, mapState}                                                                    from "vuex"
import {mdiClose, mdiRadioboxBlank, mdiRadioboxMarked, mdiCheckboxBlankOutline, mdiCheckboxMarked} from '@mdi/js'

export default {
  computed : {
    loginModal : {
      ...mapState({ get : 'loginModal' }),
      ...mapMutations({ set : 'toggleLoginModal' }),
    }
  },
  watch    : {
    message (val) {
      if (val) {
        let t = this
        setTimeout(function () {
          t.message = ''
        }, 5000)
      }
    },
  },
  data     : () => ({
    enableStudentRegistration : false,
    image                     : null,
    loadingLogin              : false,
    loadingRegistration       : false,
    loadingForgotPassword     : false,
    message                   : '',
    loginData                 : {
      email    : '',
      password : '',
    },
    forgotPasswordData        : {
      email : '',
    },
    registrationData          : {
      isStudent  : false,
      email      : '',
      password   : '',
      gender     : '',
      name       : '',
      agreeTerms : false,
      student    : {
        image : null
      }
    },
    studentObj                : {
      identity : null,
    },
    hidePrevStepButton        : false,
    password2                 : '',
    loginValidation           : true,
    regValidation             : true,
    resolve                   : null,
    reject                    : null,
    imageError                : false,
    icons                     : {
      mdiClose, mdiRadioboxBlank, mdiRadioboxMarked, mdiCheckboxBlankOutline, mdiCheckboxMarked
    },
    step                      : 'login'
  }),
  created () {
    const hostname = window.location.hostname
    if (['localhost', 'dev.myfridgehk.com', 'student.myfridgehk.com'].includes(hostname)) {
      this.enableStudentRegistration = true
    }
  },
  methods : {
    ...mapMutations(['setUser', 'setTokens', 'toggleLoginModal', 'pushSnackbarMessages']),
    setImage (image) {
      this.image = image
      this.imageError = false
    },

    async showTerms (type) {
      await this.$refs.TermsDialog.open(type)
    },

    async forgotPassword () {
      try {
        this.loadingForgotPassword = true
        if (!this.$refs.forgotPasswordForm.validate()) return

        const response = await this.$api.post('/v1/auth/forgot-password', this.forgotPasswordData)
        if (response) {
          this.message = this.$t('resetPasswordUrlSent') + this.forgotPasswordData.email
          //initialize user shopping cart when logged in
        }
        if (this.resolve) {
          this.resolve(true)
        }
      } catch (error) {
        if (error.response && error.response.data) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          this.message = error.response.data.message
        }
      } finally {
        this.loadingForgotPassword = false
      }

    },

    open (step, hidePrevStepButton) {
      this.loginModal = true
      this.loginValidation = true
      this.regValidation = true
      this.step = step ? step : 'login'
      this.hidePrevStepButton = !!hidePrevStepButton
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.loginModal = false
      this.step = 'login'
      this.hidePrevStepButton = false
      if (this.resolve) {
        this.resolve(false)
      }
    },

    async login () {
      try {
        this.loadingLogin = true
        if (!this.$refs.loginForm.validate()) return

        const response = await this.$api.post('/v1/auth/login', this.loginData)
        if (response.data) {
          this.setUser(response.data.user)
          this.setTokens(response.data.tokens)
          this.toggleLoginModal(false)

          //initialize user shopping cart when logged in
          await this.$api.myCart()
          await this.$api.getMyPrize()
          await this.$api.myProfile()
        }
        if (this.resolve) {
          this.resolve(true)
        }
      } catch (error) {
        if (error.response && error.response.data) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          this.message = error.response.data.message
        }
      } finally {
        this.loadingLogin = false
      }
    },

    async register () {
      try {
        this.loadingRegistration = true
        if (!this.image && this.registrationData.isStudent) this.imageError = true
        if (!this.$refs.registrationForm.validate() || this.imageError) return

        if (this.registrationData.isStudent) {
          //upload student identity image is required
          let bodyFormData = new FormData()
          bodyFormData.append('file', this.image)
          const image = await this.$api.post('/v1/uploads/studentImage', bodyFormData).catch(error => {
            this.message = this.$t('studentIdentityUploadFailed')
          })
          if (image.data) {
            this.registrationData.student.image = image.data.id
          }
        } else {
          delete this.registrationData.student.image
        }

        const response = await this.$api.post('/v1/auth/register', this.registrationData)
        if (response.data) {
          this.setUser(response.data.user)
          this.setTokens(response.data.tokens)
          this.toggleLoginModal(false)

          await this.registrationTracker()

          //initialize user shopping cart when logged in
          await this.$api.myCart()
          await this.$api.getMyPrize()
          this.pushSnackbarMessages(this.$t('registrationSuccess'))
          this.pushSnackbarMessages(this.$t('emailVerificationSent'))
        }

        if (this.resolve) {
          this.resolve(true)
        }
      } catch (error) {
        console.log(error)
        if (error.response && error.response.data) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          this.message = error.response.data.message
        }
      } finally {
        this.loadingRegistration = false
      }
    },

    async registrationTracker () {
      try {
        // facebook pixel tracker
        if (fbq) {
          fbq('track', 'CompleteRegistration')
        }

        //google tag manager
        window.dataLayer = window.dataLayer || []
        dataLayer.push({ event : "registration", value : 1 });

      } catch (error) {
        // wrapped
      }
      return true
    }
  }
}
</script>

