<template>
  <div class="promo" v-if="promotions[0]">
    <v-dialog v-model="dialog"
              class="primary"
              content-class="promoBanner"
              max-width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="secondary"
               depressed
               light
               text
               class="px-0 mr-3"
               v-bind="attrs"
               v-on="on">
          <v-icon :class="{shake: haveNew}">{{ icons.mdiFire }}</v-icon>
          {{ $t('offer') }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          <b>myfridge {{ $t('newOffers') }}</b>
        </v-card-title>
        <v-card-text class="px-0">
          <!--          <v-img :src="require('~/assets/images/500x500.png')"></v-img>-->
          <v-carousel hide-delimiter-background
                      height="auto"
                      class="promo-carousel"
                      hide-delimiters
                      theme="light"
                      :delimiter-icon="icons.mdiFire">
            <v-carousel-item v-for="(promotion, index) in promotions"
                             :key="index">
              <v-img max-width="500" max-height="500" :src="promotion.images[0].medium.path" :lazy-src="promotion.images[0].small.path" width="100%" aspect-ratio="1">
              </v-img>
              <div class="text-center" v-if="promotion.url">
                <v-btn elevation="2" tile block target="_blank" rel="noopener" :href="promotion.url" color="secondary">
                  <v-icon class="shake">{{ icons.mdiHandPointingRight }}</v-icon>
                  {{ $t('checkOutNow') }}
                </v-btn>
              </div>
            </v-carousel-item>

            <template v-slot:prev="{ on, attrs }">
              <v-icon large
                      color="white"
                      v-bind="attrs"
                      v-on="on">{{ icons.mdiChevronLeft }}
              </v-icon>
            </template>
            <template v-slot:next="{ on, attrs }">
              <v-icon large
                      color="white"
                      v-bind="attrs"
                      v-on="on">
                {{ icons.mdiChevronRight }}
              </v-icon>
            </template>
          </v-carousel>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color=""
                 v-if="!Cookies.get('hidePromo')"
                 text
                 @click="hide7days">{{ $t('hiddenFor7D') }}
          </v-btn>
          <v-btn color=""
                 text
                 @click="dialog=false">{{ $t('close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mdiFire, mdiChevronLeft, mdiChevronRight, mdiHandPointingRight} from '@mdi/js'
import Cookies                                                          from 'js-cookie'
import moment                                                           from 'moment'

export default {
  name     : "Promo",
  computed : {},
  async created () {
    try {
      const hostname = window.location.hostname
      const promotionTypes = { main : 'main', student : 'student' }
      const type = hostname === 'student.myfridgehk.com' ? 'student'
        : hostname === 'myfridgehk.com' ? 'main' : undefined
      const promotions = await this.$api.get('/v1/promotions/getPublishedPromotions', {
        params : {
          sortBy : '-updatedAt', type : promotionTypes[type]
        }
      })
      if (promotions.data) {
        this.promotions = promotions.data.results
      }

      if (this.promotions[0] && moment(this.promotions[0].createdAt).add(14, 'days')
                                                                    .isAfter(moment())) {
        // make the fire button shaking
        this.haveNew = true
      }

      const match = this.$route.matched.filter(item => item.path === '')

      const params = this.$route.query
      // only index show
      if (match.length && params.action !== 'paymentConfirmation') {
        this.dialog = Cookies.get('hidePromo') ? false : true
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods : {
    hide7days () {
      this.dialog = false
      Cookies.set('hidePromo', true, { expires : 7 })
    },
  },
  data () {
    return {
      promotions : [],
      dialog     : false,
      haveNew    : false,
      Cookies,
      icons      : {
        mdiFire,
        mdiChevronLeft,
        mdiChevronRight,
        mdiHandPointingRight
      }
    }
  }
}
</script>
