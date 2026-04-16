<template>
  <v-container class="retails">
    <v-row class="pt-8">
      <v-col cols="12">
        <h1>{{ $t('partners') }}</h1>
      </v-col>
      <v-col lg="6" md="6" cols="12">
        <v-img :src="require('~/assets/images/partners/decathlon.jpg')"></v-img>
      </v-col>
      <v-col lg="6" md="6" cols="12">
        <v-img :src="require('~/assets/images/partners/hktvmall.jpg')"></v-img>
      </v-col>
      <v-col lg="6" md="6" cols="12">
        <v-img :src="require('~/assets/images/partners/circlek.jpg')"></v-img>
      </v-col>
      <v-col lg="6" md="6" cols="12">
        <v-img :src="require('~/assets/images/partners/purefitness.jpg')"></v-img>
      </v-col>
      <v-col lg="6" md="6" cols="12">
        <v-img :src="require('~/assets/images/partners/go24.jpg')"></v-img>
      </v-col>
      <!--      <v-col lg="6" md="6" cols="12">-->
      <!--        <v-img :src="require('~/assets/images/partners/247fitness.jpg')"></v-img>-->
      <!--      </v-col>-->
    </v-row>
  </v-container>
</template>
<script>
export default {
  head () {
    return {
      title : this.$t('partners') + ' MyFridge'
    }
  },
  data : () => ({}),
  created () {
  },
  methods : {},
}
</script>
