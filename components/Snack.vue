<template>
  <div>
    <v-snackbar :style="{'margin-bottom':calcMargin(i), 'z-index': message.zIndex || 'inherit' + ' !important;'}"
                color="secondary darken-1"
                elevation="24"
                right
                bottom
                v-for="(message,i) in snackbarMessages"
                :key="i"
                v-model="showSnack"
                :timeout="-1">
      <template v-if="typeof message === 'string'">
        {{ message }}
      </template>
      <template v-else-if="typeof message === 'object'">
        <div class="d-flex align-center">
          <div class="d-flex align-center">
            <v-icon v-if="message.mdiIcon">{{ message.mdiIcon }}</v-icon>
            <div class="ml-1">
              {{ message.message }}
            </div>
          </div>
          <div class="cursor-pointer green--text text--lighten-1" @click="action(i,message.action)">{{ message.actionText }}</div>
        </div>
      </template>
      <template v-slot:action="{ attrs }">
        <v-btn color="secondary" text v-bind="attrs" icon @click="spliceSnackbarMessages(i)">{{ $t('close') }}</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {mdiClose}               from "@mdi/js";

export default {
  name     : "Snack",
  data     : () => ({
    showSnack : false,
    icons:{
      mdiClose
    }
  }),
  watch    : {
    snackbarMessages (val) {
      this.showSnack = val.length ? true : false
    },
  },
  computed : {
    ...mapState(['snackbarMessages']),
  },
  methods  : {

    ...mapMutations(['spliceSnackbarMessages']),
    action (index, fn) {
      if (fn) {
        fn()
      }
      this.spliceSnackbarMessages(index)
    },
    calcMargin (i) {
      return (i * 60 + 55) + 'px'
    },
  }
}
</script>
