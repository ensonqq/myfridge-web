<template>
  <v-dialog v-model="show" fullscreen hide-overlay scrollable persistent @keydown.esc="confirm" @close="close">
    <v-card>
      <v-card-title>
        <v-img max-width="40" :src="require('~/assets/images/logo.png')" class="mr-3 weblogo"></v-img>
        <template v-if="type === 'tnc'">
          {{ $t('termsAndConditions') }}
        </template>
        <template v-if="type === 'pp'">
          {{ $t('privacyPolicy') }}
        </template>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="py-10" v-if="show">
          <TermsAndConditions v-if="type === 'tnc'"></TermsAndConditions>
          <PrivacyPolicy v-if="type === 'pp'"></PrivacyPolicy>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="confirm">{{ $t('confirm') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TermsAndConditions from "@/pages/about/TermsAndConditions";
import PrivacyPolicy      from "@/pages/about/PrivacyPolicy";

export default {
  name       : "TermsDialog",
  components : { PrivacyPolicy, TermsAndConditions },
  methods    : {
    open (type) {
      this.type = type
      this.show = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.reset()
      this.resolve(false)
    },
    confirm () {
      this.reset()
      this.resolve(true)
    },
    reset () {
      this.show = false
    }
  },
  data       : () => ({
    show    : false,
    type    : '',
    resolve : null,
    reject  : null,
  })
}
</script>
