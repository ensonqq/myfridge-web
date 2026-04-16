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
                    <h1>{{ $t('myAccount') }}</h1>
                  </v-col>
                  <v-col cols="12">
                    <div class="px-3 px-md-10 py-8 ">
                      <v-form @submit.prevent="save" ref="form" v-model="profileValidation" lazy-validation>
                        <p class="d-flex align-center text-16 mb-2" v-if="user.vipTier === 'diamond'">
                          <span class="deep-purple--text text--lighten-1 d-flex align-center" @click="vipTierDetail"><v-icon class="deep-purple--text text--lighten-1">{{ icons.mdiDiamondStone }}</v-icon>{{ $t('diamondMember') }}</span>
                          <span class="ml-1 text-12">({{ $t('$1discountForAllProducts') }}及{{ $t('x3credits') }})</span>
                        </p>
                        <template v-else>
                          <template v-if="user.vipTier === 'gold'">
                            <p class="d-flex align-center text-16 mb-2">
                              <span class="amber--text text--accent-4 d-flex align-center" @click="vipTierDetail"><v-icon class="amber--text text--accent-4">{{ icons.mdiCrown }}</v-icon>{{ $t('goldMember') }}</span>
                              <span class="ml-1 text-12">({{ $t('$1discountForAllProducts') }})</span>
                            </p>
                            <div class="d-flex flex-wrap">
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
                                {{ $t('diamondMember') }}
                                <br>- {{ $t('$1discountForAllProducts') }}
                                <br>- {{ $t('x3credits') }}
                                (<i @click="vipTierDetail()" class="cursor-pointer deep-purple--text text--lighten-1">{{ $t('clickForMore') }}</i>)
                              </div>
                            </div>
                          </template>
                          <template v-else>
                            <div class="d-flex flex-wrap">
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
                                {{ $t('goldMember') }}，{{ $t('$1discountForAllProducts') }} (<i @click="vipTierDetail()" class="cursor-pointer amber--text text--darken-3">{{ $t('clickForMore') }}</i>)
                              </div>
                            </div>
                          </template>
                        </template>
                        <hr class="my-2">
                        <p class="text-14 mb-2">{{ $t('totalOrders') }}: {{ user.totalOrders }}, {{ $t('credits') }}: {{ user.credits }}
                          <v-btn v-if="topupCredits.length" @click="toggleTopUpCreditsDialog(true)" outlined depressed color="amber darken-3" class="position-relative">
                            <span class="shake">
                              <v-icon color="red">{{ icons.mdiFire }}</v-icon>
                              <!--                              <v-img class="mr-1" max-width="25" contain :src="require('~/assets/images/xmas_hat.png')"></v-img>-->
                            </span>
                            {{ $t('topupButton') }}
                          </v-btn>
                        </p>
                        <p class="text-14 mb-2">{{ $t('registerDate') }}: {{
                            moment(user.createdAt).format('YYYY-MM-DD')
                          }}</p>
                        <template v-if="user.isStudent">
                          <p class="text-14 mb-2" v-if="user.student.status === 'approved'">
                            <v-icon size="20">{{ icons.mdiAccountSchool }}</v-icon>
                            {{ $t('studentAccount') }}, {{ $t('validTill') }} {{
                              moment(user.student.endAt).format('YYYY-MM-DD')
                            }}
                          </p>
                          <p class="text-14 mb-2">{{ $t('studentAccount') }}: {{ $t('studentRole') }} ({{ $t(user.student.status) }})
                            <v-btn v-if="user.student.status==='rejected'" @click="resubmitStudent" depressed class="secondary ml-5" small text>{{ $t('clickToResubmit') }}</v-btn>
                          </p>
                        </template>


                        <p class="text-14 mb-1 mt-8">{{ $t('account(email)') }}
                          <template v-if="profile.isEmailVerified">
                            <v-chip x-small color="green darken-3" dark>
                              {{ $t('verified') }}
                            </v-chip>
                          </template>
                          <template v-else>
                            <v-chip x-small color="amber">
                              {{ $t('unverified') }}
                            </v-chip>
                            <a class="text-decoration-underline" @click.stop.prevent="emailVerification">{{ $t('verifyNow') }}</a>
                          </template>
                        </p>
                        <v-text-field class="mb-2"
                                      :disabled="profile.isEmailVerified"
                                      outlined dense
                                      v-model="profile.email"
                                      :rules="[$validations.required, $validations.email]"></v-text-field>


                        <p class="text-14 mb-1">{{ $t('name') }}</p>
                        <v-text-field class="mb-2"
                                      outlined dense
                                      v-model="profile.name"
                                      :rules="[$validations.required]"></v-text-field>


                        <p class="text-14  mb-1">{{ $t('gender') }}</p>
                        <v-radio-group v-model="profile.gender" row :rules="[$validations.required]" class="mb-8">
                          <v-radio :on-icon="icons.mdiRadioboxMarked"
                                   :off-icon="icons.mdiRadioboxBlank" color="secondary" :label="$t('male')" value="m"></v-radio>
                          <v-radio :on-icon="icons.mdiRadioboxMarked"
                                   :off-icon="icons.mdiRadioboxBlank" color="secondary" :label="$t('female')" value="f"></v-radio>
                        </v-radio-group>

                        <p class="text-14 mb-1">{{ $t('myAddresses') }}</p>
                        <ol type="1">
                          <li class="mt-3" v-for="(address, index) in profile.addresses">{{ $t(address.area) }}, {{ $t(address.district) }}, {{ $t(address.subDistrict) }}, {{ address.fullAddress }} ({{ $t('receiver') }}: {{ address.phone }}, {{ address.recipient }})
                            <v-btn icon>
                              <v-icon @click="openAddress(index)">{{ icons.mdiPencil }}</v-icon>
                            </v-btn>
                          </li>
                          <li class="mt-5 d-flex" style="list-style: none">
                            <v-btn outlined depressed @click="openAddress()">＋{{ $t('newAddress2') }}</v-btn>
                          </li>
                        </ol>

                        <v-col cols="12" class="amber--text text-center">{{ message }}</v-col>

                      </v-form>
                      <div class="text-14 text-center my-3">
                        <v-btn @click="save" :loading="loading" color="secondary" depressed class="text-h6">{{ $t('save') }}</v-btn>
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
    <Address ref="Address"></Address>
    <StudentIdentityResubmitDialog ref="StudentIdentityResubmitDialog"></StudentIdentityResubmitDialog>
    <VipTierDialog ref="VipTierDialog"></VipTierDialog>
    <ConfirmDialog ref="ConfirmDialog"></ConfirmDialog>
  </div>
</template>
<script>
import {CardSection}            from '@/assets/database/data.js';
import _                        from 'lodash'
import {mapMutations, mapState} from 'vuex'
import {
  mdiRadioboxBlank,
  mdiRadioboxMarked,
  mdiPencil,
  mdiAccountSchool,
  mdiCrown,
  mdiFire,
  mdiAccountHardHatOutline, mdiEmail, mdiDiamondStone
}                               from "@mdi/js";
import moment                   from 'moment'
import Address
                                from "@/components/Address";
import StudentIdentityResubmitDialog
                                from "@/components/session/StudentIdentityResubmitDialog";
import CreditRedemption         from '@/components/CreditRedemption'

export default {
  head () {
    return {
      title : this.$t('myAccount') + ' MyFridge'
    }
  },
  layout     : 'auth',
  computed   : {
    ...mapState(['user', 'topupCredits'])
  },
  components : {
    Address,
    StudentIdentityResubmitDialog,
    CreditRedemption,
  },
  async created () {
    this.profile = _.clone(this.user)
  },
  data () {
    return {
      studentStatuses   : { pending : '等待驗證', approved : '已通過', rejected : '被拒絕' },
      profile           : {},
      profileValidation : true,
      icons             : {
        mdiRadioboxBlank, mdiRadioboxMarked, mdiPencil, mdiAccountSchool, mdiCrown, mdiFire, mdiAccountHardHatOutline,
        mdiDiamondStone
      },
      message           : '',
      moment,
      loading           : false,
      areas             : {
        hk  : '港島',
        kln : "九龍",
        nt  : '新界'
      },
    }
  },
  methods : {
    ...mapMutations(['toggleTopUpCreditsDialog', 'pushSnackbarMessages']),
    async emailVerification () {
      const confirm = await this.$refs.ConfirmDialog.open(this.$t('emailVerification'), `${ this.$t('youAreVerifyingEmail') }: ${ this.profile.email }，${ this.$t('emailVerificationBonusTip') }`, mdiEmail)
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
    async vipTierDetail () {
      await this.$refs.VipTierDialog.open()
    },
    async resubmitStudent () {
      const resubmit = await this.$refs.StudentIdentityResubmitDialog.open()
    },
    async openAddress (addressIndex) {
      const selectedAddressIndex = await this.$refs.Address.open(addressIndex)
      if (_.isNumber(selectedAddressIndex)) {
        this.profile = _.clone(this.user)
      }
    },
    async save () {
      if (!this.$refs.form.validate()) return
      this.loading = true
      try {
        const profile = _.pick(this.profile, ['email', 'name', 'gender'])
        const result = await this.$api.patch('/v1/users/me', profile)
        if (result) {
          this.message = '更新成功'
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
