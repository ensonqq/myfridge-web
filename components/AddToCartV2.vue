<template>
  <div class="addedToCartV2" :class="{fixed: fixed, soldOut}">
    <div class="inner">
      <template v-if="!soldOut">
        <template v-if="getValueFromCart">
          <v-btn icon color="white" small outlined @click="customQuantity(-1, itemId, true)">
            <v-icon color="white">{{ icons.mdiMinus }}</v-icon>
          </v-btn>
          <v-text-field @submit.prevent color="white" :value="getValueFromCart" @change="customQuantity($event, itemId)" single-line size="3" class="centered-input customized" type="number"></v-text-field>
          <v-btn icon color="white" small outlined @click="customQuantity(1, itemId, true)">
            <v-icon color="white">{{ icons.mdiPlus }}</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <div class="py-1">
            <v-btn depressed small color="transparent white--text" @click="customQuantity(1, itemId, true)">
              <v-icon size="18">{{ icons.mdiCartOutline }}</v-icon>
              <b style="margin-left: -3px;">＋</b>
            </v-btn>
          </div>
        </template>
      </template>
      <v-btn v-else color="darken-3" text dark class="confirmBtn">{{ $t('productionInProgress') }}…</v-btn>
    </div>
  </div>
</template>
<script>
import {mdiPlus, mdiMinus}      from '@mdi/js'
import {mapMutations, mapState} from "vuex"
import _                        from 'lodash'
import {mdiCartOutline}         from '@mdi/js'

export default {
  name     : "AddToCartV2",
  props    : ['itemId', 'fixed', 'soldOut'],
  data     : () => ({
    icons : { mdiPlus, mdiMinus, mdiCartOutline }
  }),
  computed : {
    ...mapState(['cart', 'categories']),
    getValueFromCart () {
      const itemInCart = this.cart.filter(item => item.product.id === this.itemId).map(item => item.quantity)
      return itemInCart[0] ? itemInCart[0] : 0
    }
  },
  methods  : {
    ...mapMutations(['setCart', 'pushSnackbarMessages']),
    getCategoryDetail (catId) {
      return this.categories.filter(item => item.id === catId)[0]
    },
    addToCartTracker (item) {
      try {
        // facebook pixel tracker
        if (fbq) {
          fbq('track', 'AddToCart')
        }

        // google tag manager
        const category = this.getCategoryDetail(item.product.category)
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ ecommerce : null })
        window.dataLayer.push({
          event     : "add_to_cart",
          ecommerce : {
            currency : "HKD",
            value    : item.product.discountPrice || item.product.price,
            items    : [
              {
                item_id        : item.product.id,
                item_name      : item.product.name.zh,
                item_brand     : 'MyFridge',
                item_category  : category.name.zh,
                item_category2 : category.name.en,
                price          : item.product.discountPrice || item.product.price,
                quantity       : item.quantity
              }
            ]
          }
        });
      } catch (error) {
        // wrapped
        // console.log(error)
      }
    },
    async customQuantity (event, itemId, byButton) {
      if (!Number.isInteger(parseInt(event))) return;

      const pureCartItemToApi = this.cart.map(item => ({ product : item.product.id, quantity : item.quantity }))
      let indexInCart = _.findIndex(this.cart, (item) => item.product.id === itemId)

      if (indexInCart > -1 && this.cart[indexInCart].product.name.zh.indexOf('試食') > -1) {
        if (_.toInteger(event) > 0) {
          return this.pushSnackbarMessages(this.$t('trialPackLimitExceed'))
        }
      }

      // add item to cart api object
      if (indexInCart < 0) {
        indexInCart = pureCartItemToApi.push({ product : itemId, quantity : 0 }) - 1
      }

      // by button click or set by input
      if (byButton) {
        pureCartItemToApi[indexInCart].quantity += _.toInteger(event)
      } else {
        pureCartItemToApi[indexInCart].quantity = _.toInteger(event)
      }

      // check if quantity is below 1, set to 0 by default
      if (pureCartItemToApi[indexInCart].quantity < 1) {
        pureCartItemToApi.splice(indexInCart, 1)
      }

      await this.$api.updateCart(pureCartItemToApi)

      // after cart array update in backend, initiate tracker
      if (indexInCart && pureCartItemToApi[indexInCart] && pureCartItemToApi[indexInCart].quantity > 0) {
        const product = this.cart[indexInCart]
        this.addToCartTracker(product)
      }
    },
  }
}
</script>
