<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="mb-1">
          <AccountHeader></AccountHeader>
        </v-col>
        <v-col cols="12">
          <Box class="dashboard-box">
            <div slot="boxSidebar">
              <DashboardSidebar/>
            </div>
            <div slot="boxContent">
              <div class="px-md-10 px-1 height-800">
                <v-row>
                  <v-col cols="12">
                    <h1>{{ $t('changePassword') }}</h1>
                  </v-col>
                  <v-col cols="12">
                    <div class="px-3 px-md-10 py-8 ">
                      <v-form @submit.prevent="save" ref="form" v-model="passwordValidation" lazy-validation>
                        <p class="text-14 mb-5">{{ $t('totalOrders') }}: {{ user.totalOrders }}, {{ $t('credits') }}: {{ user.credits }}</p>
                        <p class="text-14 mb-5">{{ $t('registerDate') }}: {{
                            moment(user.createdAt).format('YYYY-MM-DD')
                          }}</p>

                        <p class="text-14 mb-1">{{ $t('currentPassword') }}</p>
                        <v-text-field class="mb-5"
                                      type="password"
                                      id="oldpassword"
                                      outlined dense
                                      v-model="password.old"
                                      :rules="[$validations.required]">
                          <template slot="append">
                            <v-btn icon @click="toggleType('oldpassword')">
                              <v-icon id="oldpasswordEye">{{ icons.mdiEye }}</v-icon>
                              <v-icon id="oldpasswordEyeOff" class="hidden">{{ icons.mdiEyeOff }}</v-icon>
                            </v-btn>
                          </template>
                        </v-text-field>


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
                      <div class="text-14 text-center my-3">
                        <v-btn @click="save" :loading="loading" class="text-h6 font-weight-light" depressed>{{ $t('save') }}</v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </Box>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import {CardSection}                                            from '@/assets/database/data.js';
import _                                                        from 'lodash'
import {mapState, mapMutations}                                 from 'vuex'
import {mdiRadioboxBlank, mdiRadioboxMarked, mdiEye, mdiEyeOff} from "@mdi/js";
import moment                                                   from 'moment'

export default {
  head () {
    return { title : this.$t('changePassword') + ' myfridge' }
  },
  layout   : 'auth',
  computed : {
    ...mapState(['user'])
  },
  created () {
  },
  data () {
    return {
      password           : {
        old  : '',
        new  : '',
        new2 : ''
      },
      passwordValidation : true,
      icons              : { mdiRadioboxBlank, mdiRadioboxMarked, mdiEye, mdiEyeOff },
      message            : '',
      moment,
      loading            : false
    }
  },
  methods : {
    ...mapMutations(['logout']),
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
        const t = this
        const result = await this.$api.post('/v1/auth/change-password', this.password)
        if (result) {
          this.message = this.$t('updatedSuccessfullyMsg')
          setTimeout(function () {
            t.logout()
          }, 2000)
          this.passwordValidation = true
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
