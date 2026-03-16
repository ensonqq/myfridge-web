<template>
  <v-card elevation="0" class="br-10 mb-3">
    <div class="position-relative">
      <div class="featured" :class="{'br-28': item.category.name.zh !== '奶粉' && item.category.name.zh !== '雞胸'}" v-if="item.featured === true"></div>
      <v-img position="center center"
             @click.prevent="$router.push('/product/' + item.name.zh); $emit('openProductDetail', item.name.zh)"
             contain
             :class="{'br-28': item.category.name.zh !== '奶粉' && item.category.name.zh !== '雞胸'}"
             width="100%"
             :aspect-ratio="imageRatio[item.category.name.en]"
             :lazy-src="item.images[0].small.path"
             :src="item.images[0].medium.path">
      </v-img>
      <v-chip v-if="item.discountPrice"
              label
              flat
              class="p-absolute top-0 rounded-r-xl rounded-l-0 discount-label"
              color="secondary">
        {{ $t('sale') }}
      </v-chip>
      <AddToCartV2 :soldOut="item.soldOut" @click.prevent :itemId="item.id"></AddToCartV2>
      <div v-if="moment(item.createdAt).add(30, 'days').isAfter(moment())" class="new-stamp shake"></div>
    </div>

    <div class="product-title pb-0">
      <div class="col-12 pa-0 pt-1 d-flex benchmark">
        <div class="d-flex align-center">
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
      <div class="d-block me-3 f-600 text-18 text-lg-h5 card-title">
        <div><span class="red--text text--darken-4 mr-1" v-if="item.featured">{{ $t('featured') }}<v-icon size="16" color="red darken-4">{{ icons.mdiCreation }}</v-icon></span>{{ item.name[$i18n.locale] }}
        </div>
        <div class="d-flex">
          <div class="d-flex align-center">
            <v-icon small color="yellow darken-2">{{ icons.mdiStar }}</v-icon>
            <span class="font-weight-bold text-14 amber--text text--darken-2">5</span>
          </div>
          <!--          <div class="grey&#45;&#45;text text&#45;&#45;darken-1 text-14 ml-2">{{ item.madeIn.zh }}製造</div>-->
          <div class="grey--text text--darken-1 text-14 ml-2">{{ item.nutritionInfo.protein }}{{ $t('gramsOfProtein') }}</div>
        </div>
      </div>
    </div>
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
    ...mapMutations(['addToCart']),
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
    imageRatio : {
      Chicken : 0.661237785,
      Dimsum  : 1.3280757098,
      Box     : 1.3365079365,
      Whey    : 0.4714445689,
      Trial   : 1,
    },
    icons      : {
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
