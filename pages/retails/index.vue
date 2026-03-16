<template>
  <v-container class="retails">
    <v-row class="pt-8">
      <v-col cols="12">
        <h1>{{ $t('retailStoresLong') }}</h1>
      </v-col>
      <v-col cols="12">
        <v-tabs bg-color="secondary">
          <v-tab :key="item.value" v-for="item in areas" @click="area = item.value">{{ item.text }}</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" class="d-flex flex-wrap justify-lg-start justify-md-start justify-center">
        <div class="pa-3 col-12 col-md-6 col-lg-3" v-for="retail in retails" v-if="retail.area === area">
          <v-card>
            <div class="d-flex justify-center align-center">
              <v-img v-if="retail.images[0]" cover class="br-10" width="300" height="300" :src="retail.images[0].medium.path" alt=""></v-img>
            </div>
            <v-card-title class="pb-0">{{ retail.name[$i18n.locale] }}</v-card-title>
            <v-card-text>
              <div class="my-4 text-subtitle-1 d-flex flex-column">
                <div>{{ $t(retail.area) }}</div>
                <div class="d-flex align-center">
                  <v-icon small>{{ icons.mdiPhone }}</v-icon>
                  <div class="ml-2">{{ retail.phone }}</div>
                </div>
                <div class="d-flex align-center">
                  <v-icon small>{{ icons.mdiMapMarkerOutline }}</v-icon>
                  <div class="ml-2">{{ retail.fullAddress }}</div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mdiMapMarkerOutline, mdiPhone} from "@mdi/js";

export default {
  head () {
    return {
      title : this.$t('retailStores') + ' myfridge'
    }
  },
  data     : () => ({
    area       : 'hk',
    loading    : false,
    areaMapper : {
      hk  : '香港島',
      kln : '九龍',
      nt  : '新界',
    },
    retails    : [],
    selection  : 1,
    icons      : {
      mdiPhone,
      mdiMapMarkerOutline
    },
  }),
  computed : {
    areas () {
      return [{ text : this.$t('hk'), value : 'hk' }, { text : this.$t('kln'), value : 'kln' },
        { text : this.$t('nt'), value : 'nt' }]
    },
  },
  created () {
    this.getRetails()
  },
  methods : {
    async getRetails () {
      try {
        const req = await this.$api.get('/v1/retails', { params : { status : 'published' } })
        if (req && req.data) {
          this.retails = req.data.results
        }
      } catch (e) {
        console.log(e)
      }
    },
    reserve () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>
