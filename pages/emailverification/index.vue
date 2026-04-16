<template>
  <div>
    <v-card flat min-height="100vh">
      <v-row>
        <v-col cols="12">
          <div class="px-3 px-md-10 py-8 ">
            <!--            <div class="text-center"><img src="~/assets/images/logo.png" alt="" width="100" height="100"/></div>-->
            <h2 class="mb-2 text-center">{{ $t('emailVerification') }}</h2>
          </div>
        </v-col>
        <v-col cols="12" class="text-center" v-if="loading">
          <v-icon>{{ icons.mdiEmailOutline }}</v-icon>
          {{ $t('emailVerificationInProcess') }}
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import {mdiEmailOutline} from "@mdi/js";
import moment            from 'moment'
import {mapMutations}    from "vuex";

export default {
  head () {
    return {
      title : this.$t('emailVerification') + ' MyFridge'
    }
  },

  data () {
    return {
      icons   : { mdiEmailOutline },
      message : '',
      loading : true,
    }
  },
  async created () {
    const token = this.$route.query.token
    if (!token) {
      return this.$router.push('/')
    }
    await this.verifyEmailVerificationToken(token)
  },
  methods : {
    ...mapMutations(['pushSnackbarMessages']),
    async verifyEmailVerificationToken (token) {
      try {
        const verification = await this.$api.post('/v1/auth/verify-email?token=' + token)
        if (verification && verification.data) {
          const creditsGained = verification.data.creditsGained
          this.pushSnackbarMessages(this.$t('emailVerificationSuccess', { value : creditsGained }))
          await this.$api.myProfile()
        } else {
          this.pushSnackbarMessages(this.$t('emailVerificationFailed'))
        }
      } catch (error) {
        this.pushSnackbarMessages(this.$t('emailVerificationFailed'))
      } finally {
      }
      return this.$router.push('/')
    }
  }
}
</script>
