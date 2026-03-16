<template>
  <v-btn v-scroll="onScroll"
         :class="[this.offsetTop >= 200 ? 'd-block' : 'd-none', 'scrollToTop']"
         small
         fixed
         bottom
         right
         fab
         elevation="2"
         dark
         color="secondary"
         @click="$vuetify.goTo(0)">
    <v-icon dark>{{ icons.mdiChevronUp }}</v-icon>
  </v-btn>
</template>

<script>
import {mdiChevronUp} from '@mdi/js'

export default {
  data () {
    return {
      offsetTop : 0,
      icons     : {
        mdiChevronUp
      }
    }
  },
  methods : {
    onScroll (e) {
      this.offsetTop = window.pageYOffset;
    },
  },

}
</script>
