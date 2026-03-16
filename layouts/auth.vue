<template>
  <v-app>
    <Header/>
    <Nuxt v-if="user.id" class="content"/>
    <v-container v-else class="my-16">
      <v-card max-width="500" class="mx-auto">
        <v-form class="mt-16 pa-5" @submit.prevent="login" ref="loginForm" v-model="loginValidation" lazy-validation>
          <div class="text-center"><img src="~/assets/images/logo_short.png" alt="" width="100" height="100"/></div>
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

          <v-btn type="submit" block color="secondary white--text" class="text-capitalize font-600" :loading="loadingLogin">登入</v-btn>
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
          <v-btn color="secondary" @click="openSignInDialog('registration')" class="text-h6 font-weight-light">{{ $t('register') }}</v-btn>
        </div>
        <div class="py-1 bg-grey-light">
          <div class="text-center">
            <span class="grey--text text--darken-1">{{ $t('forgetPassword') }}? <v-btn @click="openSignInDialog('forgotPassword')" text class="ms-2 grey--text text--darken-4 font-600">{{ $t('resetNow') }}</v-btn></span>
          </div>
        </div>
      </v-card>
    </v-container>
    <!--    <GoToBtn/>-->
    <TopUpCreditsDialog></TopUpCreditsDialog>
    <ShoppingCart></ShoppingCart>
    <NavbarList></NavbarList>
    <Snack></Snack>
    <Spinner></Spinner>
    <Footer></Footer>
    <SignIn ref="SignIn"></SignIn>
  </v-app>
</template>
<script>
import {mapMutations, mapState} from 'vuex'

export default {
  computed : {
    ...mapState(['user'])
  },
  data () {
    return {
      loginValidation : true,
      loginData       : {
        email    : '',
        password : '',
      },
      loadingLogin    : false,
      message         : ''
    }
  },
  methods : {
    ...mapMutations(['setUser', 'setTokens']),
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
          await this.$api.myProfile()
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
    }
  }
}
</script>
<style scoped>
.content {
  margin-top: 64px;
}
</style>


