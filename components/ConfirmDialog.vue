<template>
  <v-dialog v-model="show" max-width="290">
    <v-card>
      <v-card-title class="text-h5">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        {{ title }}
      </v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-3" text @click="confirm">{{ $t('confirm') }}</v-btn>
        <v-btn color="darken-1" text @click="close">{{ $t('cancel') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name    : "ConfirmDialog",
  methods : {
    open (title, message, icon) {
      this.show = true
      this.title = title
      this.message = message
      this.icon = icon
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
      this.message = ''
      this.title = ''
    }
  },
  data    : () => ({
    show    : false,
    resolve : null,
    reject  : null,
    message : '',
    title   : '',
    icon    : null
  })
}
</script>
