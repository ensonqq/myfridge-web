<template>
  <v-card elevation="0" class="mb-3">
    <v-row class="pa-0 pb-6 pt-4">
      <v-col class="position-relative pa-1" cols="4">
        <div class="position-relative">
          <div class="featured" :class="{'br-28': item.category.name.zh !== '奶粉' && item.category.name.zh !== '雞胸'}" v-if="item.featured === true"></div>
          <v-img position="center center"
                 @click.prevent="productImageClicked(item)"
                 contain
                 width="100%"
                 :aspect-ratio="1"
                 :lazy-src="item.images.length? item.images[0].small.path: 'https://placehold.co/400'"
                 :src="item.images.length? item.images[0].medium.path: 'https://placehold.co/400'">
          </v-img>
        </div>

        <v-chip v-if="item.discountPrice"
                label
                flat
                class="p-absolute top-0 rounded-r-xl rounded-l-0 discount-label"
                color="secondary">
          {{ $t('sale') }}
        </v-chip>
        <!--        <div v-if="moment(item.createdAt).add(30, 'days').isAfter(moment())" class="new-stamp shake"></div>-->
      </v-col>

      <v-col class="position-relative pa-1 py-4" cols="8">
        <v-row class="px-2 pl-3 py-0">
          <v-col class="pa-0 ma-0" cols="12">
            <div class="d-block me-3 text-md-18 text-14 text-lg-h5">
              <div class="d-flex justify-space-between">
                <div>
              <span class="red--text text--darken-4 mr-1" v-if="item.featured">{{ $t('featured') }}
                <v-icon size="16" color="red fewdarken-4">{{ icons.mdiCreation }}</v-icon>
              </span><span class="text-lg-h6 text-md-18 text-14" v-html="getProductName(item.name[$i18n.locale])"></span>
                </div>
                <!--            <div class="ml-1">-->
                <!--              <v-icon small color="yellow darken-2">{{ icons.mdiStar }}</v-icon>-->
                <!--              <span class="font-weight-bold text-14 amber&#45;&#45;text text&#45;&#45;darken-2">5</span>-->
                <!--            </div>-->
              </div>
              <div class="d-flex flex-wrap justify-space-between">
                <div class="col-12 pa-0 py-1 ma-0 text-14 grey--text text--darken-3" v-if="item.addons && item.addons.length">
                  *{{ $t('hasAddons') }}
                </div>
                <div>
                <span v-if="user.vipTier === 'gold' || user.vipTier === 'diamond'" class="d-flex align-center">
                  <v-icon class="text-12 deep-purple--text text--lighten-1" v-if="user.vipTier === 'diamond'" small>{{ icons.mdiDiamondStone }}</v-icon>
                  <v-icon class="text-12 amber--text text--accent-4" v-else small>{{ icons.mdiCrown }}</v-icon>
                  <span class="primary--text font-weight-bold text-18 text-lg-h5 f-600">${{ (item.discountPrice || item.price) - 1 }}</span>
                  <del class="grey--text text--darken-2 ml-1">${{ item.discountPrice || item.price }}</del>
                </span>
                  <span v-else-if="item.discountPrice">
                  <span class="primary--text font-weight-bold text-18 text-lg-h5 f-600">${{ item.discountPrice }}</span>
                  <del class="grey--text text--darken-2">${{ item.price }}</del>
                </span>
                  <span v-else>
                  <span class="primary--text font-weight-bold text-18 text-lg-h5 f-600">${{ item.price }}</span>
                </span>
                </div>
              </div>
              <!--          <div class="grey&#45;&#45;text text&#45;&#45;darken-1 text-14 ml-2">{{ item.madeIn.zh }}製造</div>-->
              <!--            <div class="grey&#45;&#45;text text&#45;&#45;darken-1 text-14 ml-2">{{ item.nutritionInfo.protein }}{{ $t('gramsOfProtein') }}</div>-->

            </div>
          </v-col>
          <v-col class="pa-0 ma-0 carButtonWrapper" cols="12">
            <AddToCartV3 :addons="item.addons" :soldOut="item.soldOut" @click.prevent :itemId="item.id"></AddToCartV3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {
  mdiStar,
  mdiChevronRight,
  mdiChevronLeft,
  mdiCartPlus,
  mdiCrown,
  mdiCreation,
  mdiDiamondStone
}                               from '@mdi/js'
import {mapMutations, mapState} from "vuex";
import moment                   from 'moment'

export default {
  components : {},

  props   : ['item'],
  methods : {
    getProductName (name) {
      return name.replace('(', '<br>(')
    },
    ...mapMutations(['addToCart']),
    productImageClicked (item) {
      this.$router.push('/product/' + window.encodeURI(item.name.zh));
      this.$emit('openProductDetail', window.encodeURI(item.name.zh))
    }
  },
  mounted () {
    // for sitemap
    // if (!window.fucked) window.fucked = []
    // window.fucked.push(`<url><loc>https://myfridgehk.com/product/${ encodeURIComponent(this.item.name.zh) }</loc><changefreq>always</changefreq><priority>0.9</priority></url>`)
  },
  computed : {
    ...mapState(['user'])
  },
  data     : () => ({
    moment,
    icons : {
      mdiStar,
      mdiChevronRight,
      mdiChevronLeft,
      mdiCartPlus,
      mdiCrown,
      mdiCreation,
      mdiDiamondStone,
    }
  })
}
</script>
