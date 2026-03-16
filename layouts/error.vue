<template>
  <v-container class="fill-height">
    <v-card min-height="100vh" width="100%" flat>
      <v-card-text>
        <v-row>
          <v-col class="mt-16 text-center">
            <h1 class="mt-16">
              <v-icon x-large color="black" class="mr-2">{{ icons.mdiTruckAlertOutline }}</v-icon>
              {{ $t('pageError') }}
            </h1>
            <div class="text-h5 mt-16">{{ $t('pageNotExists') }}<a class="ml-1" href="/">{{ $t('backToHomePage') }}</a>！
            </div>
            <p class="mt-16">{{ $t('redirectMsg', { value : countDown }) }}</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {mdiTruckAlertOutline} from "@mdi/js"

export default {
  props  : ['error'],
  layout : 'error', // you can set a custom layout for the error page
  mounted () {
    this.countDownTimer()
  },
  methods : {
    countDownTimer () {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      } else {
        window.location.replace('/')
      }
    }
  },
  data    : () => ({
    icons     : { mdiTruckAlertOutline },
    countDown : 5
  })
}
</script>
