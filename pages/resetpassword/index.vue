<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="px-3 px-md-10 py-8 ">
            <div class="text-center weblogo"><img src="~/assets/images/logo.png" alt="" width="100" height="100"/></div>
            <h2 class="mb-2 text-center">{{ $t('resetPassword') }}</h2>
            <v-form @submit.prevent="save" ref="form" v-model="resetPasswordValidation" lazy-validation>
              <p class="text-14 mb-1">{{ $t('newPassword') }}</p>
              <v-text-field class="mb-5"
                            type="password"
                            id="newpassword"
                            outlined dense
                            v-model="password.new"
                            :rules="[$validations.required]">
                <template slot="append">
                  <v-btn icon @click="toggleType('newpassword')">
                    <v-icon id="newpasswordEye">{{ icons.mdiEye }}</v-icon>
                    <v-icon id="newpasswordEyeOff" class="hidden">{{ icons.mdiEyeOff }}</v-icon>
                  </v-btn>
                </template>

              </v-text-field>

              <p class="text-14 mb-1">{{ $t('reEnterNewPassword') }}</p>
              <v-text-field class="mb-5"
                            type="password"
                            id="newpassword2"
                            outlined dense
                            v-model="password.new2"
                            :rules="[$validations.passwordMatch(password.new, password.new2)]">
                <template slot="append">
                  <v-btn icon @click="toggleType('newpassword2')">
                    <v-icon id="newpassword2Eye">{{ icons.mdiEye }}</v-icon>
                    <v-icon id="newpassword2EyeOff" class="hidden">{{ icons.mdiEyeOff }}</v-icon>
                  </v-btn>
                </template>
              </v-text-field>

              <v-col cols="12" class="amber--text text-center">{{ message }}</v-col>

            </v-form>
            <div class="text-14 text-center">
              <v-btn @click="save" :loading="loading" class="text-h6 font-weight-light" depressed>{{ $t('resetNow') }}</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mdiEye, mdiEyeOff} from "@mdi/js";
import moment              from 'moment'

export default {
  head () {
    return {
      title : this.$t('resetPassword') + ' MyFridge'
    }
  },

  data () {
    return {
      icons                   : {
        mdiEye, mdiEyeOff
      },
      password                : {
        new  : '',
        new2 : ''
      },
      resetPasswordValidation : true,
      message                 : '',
      moment,
      loading                 : false.valueOf(),
      success                 : false
    }
  },

  methods : {
    toggleType (id) {
      const element = document.getElementById(id)
      const eye = document.getElementById(id + 'Eye')
      const eyeOff = document.getElementById(id + 'EyeOff')
      if (element.type === 'password') {
        element.type = 'text'
        eye.classList.add('hidden')
        eyeOff.classList.remove('hidden')
      } else {
        element.type = 'password'
        eye.classList.remove('hidden')
        eyeOff.classList.add('hidden')
      }
    },

    async save () {
      if (!this.$refs.form.validate()) return
      this.loading = true
      try {
        const result = await this.$api.post('/v1/auth/reset-password?token=' + this.$route.query.token, { password : this.password.new })
        if (result) {
          this.message = this.$t('resetPasswordSuccessMsg')
          this.success = true
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
        this.loading = false
      }
    }
  }
}
</script>
