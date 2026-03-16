<template>
  <v-img class="br-10 d-flex cover-img align-end"
         cover
         height="250"
         position="top center"
         :src="require('~/assets/images/header-bg.jpeg')"
         gradient="to top, rgba(0,0,0,.7), rgba(0,0,0,0)">

    <div class="d-flex justify-center justify-md-space-between align-center mx-10 cover-image-content ">
      <div class="d-md-flex d-block align-center text-md-left text-center flex-wrap">
        <div>
          <div class="d-flex mb-16">
            <div class="text-center">
              <h2 class="font-weight-bold white--text">{{ user.name }}</h2>
              <h6 class="font-weight-regular white--text">{{ $t('member') }}</h6>
            </div>
            <div class="mx-3">
              <v-divider
                vertical
                dark
              ></v-divider>
            </div>
            <div class="text-center">
              <h2 class="font-weight-bold white--text">{{ user.totalOrders }}</h2>
              <h6 class="font-weight-regular white--text">{{ $t('order') }}</h6>
            </div>
            <div class="mx-3">
              <v-divider
                vertical
                dark
              ></v-divider>
            </div>
            <div class="text-center">
              <h2 class="font-weight-bold white--text">{{ user.credits }}</h2>
              <h6 class="font-weight-regular white--text">{{ $t('credits') }}</h6>
            </div>
          </div>
        </div>
      </div>

    </div>
  </v-img>
</template>

<script>
import {mapState} from "vuex";

export default {
  name     : "AccountHeader",
  computed : {
    ...mapState(['user'])
  }
}
</script>
