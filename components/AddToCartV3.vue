<template>
  <div class="addedToCartV3" :class="{fixed: fixed, soldOut}">
    <div class="inner">
      <template v-if="!soldOut">
        <template v-if="getValueFromCart">
          <v-btn icon color="white" small outlined @click="customQuantity(-1, itemId, true)">
            <v-icon color="white">{{ icons.mdiMinus }}</v-icon>
          </v-btn>
          <v-text-field @submit.prevent
                        color="white"
                        :value="getValueFromCart"
                        :disabled="!!(addons && addons.length)"
                        @change="customQuantity($event, itemId)"
                        single-line
                        size="3"
                        class="centered-input customized"
                        type="number"></v-text-field>
          <v-btn icon color="white" small outlined @click="customQuantity(1, itemId, true)">
            <v-icon color="white">{{ icons.mdiPlus }}</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <div class="py-0">
            <v-btn depressed small color="transparent white--text" @click="customQuantity(1, itemId, true)">
              <v-icon size="18">{{ icons.mdiCartOutline }}</v-icon>
              <b style="margin-left: -3px;">＋</b>
            </v-btn>
          </div>
        </template>
      </template>
      <v-btn v-else color="darken-3" text dark class="confirmBtn">{{ $t('productionInProgress') }}…</v-btn>
    </div>
    <SelectAddons ref="SelectAddons"></SelectAddons>
  </div>
</template>
<script>
import {mdiPlus, mdiMinus}      from '@mdi/js'
import {mapMutations, mapState} from "vuex"
import _                        from 'lodash'
import {mdiCartOutline}         from '@mdi/js'
import SelectAddons             from "@/components/SelectAddons";

export default {
  name       : "AddToCartV3",
  props      : ['itemId', 'fixed', 'soldOut', 'addons'],
  data       : () => ({
    icons : { mdiPlus, mdiMinus, mdiCartOutline }
  }),
  components : {
    SelectAddons
  },
  computed   : {
    ...mapState(['cart', 'categories']),
    getValueFromCart () {
      return this.cart.filter(item => item.product.id === this.itemId).map(item => item.quantity)
                 .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
  },
  methods    : {
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
                item_brand     : 'myfridge',
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
      let addons = null
      if (this.addons && this.addons.length && event > 0) {
        const selectedAddonIndex = await this.$refs.SelectAddons.open(null, this.addons)
        if (selectedAddonIndex === null) return
        if (selectedAddonIndex !== -1) {
          addons = JSON.parse(JSON.stringify(this.addons[selectedAddonIndex]))
          delete addons._id
        }
      }

      if (!Number.isInteger(parseInt(event))) return;

      const pureCartItemToApi = this.cart.map(item => ({
        product : item.product.id, quantity : item.quantity, addons : item.addons
      }))

      let indexInCart = _.findIndex(this.cart, (item) => {
        if (addons && item.addons) {
          return item.product.id === itemId && addons.name.zh === item.addons.name.zh && addons.price === item.addons.price
        } else {
          return item.product.id === itemId
        }
      })


      // trial pack purchase limit: only 1
      if (indexInCart > -1 && this.cart[indexInCart].product.name.zh.indexOf('試食') > -1) {
        if (_.toInteger(event) > 0) {
          return this.pushSnackbarMessages(this.$t('trialPackLimitExceed'))
        }
      }

      // add item to cart api object
      if (indexInCart < 0) {
        if (addons) {
          indexInCart = pureCartItemToApi.push({ product : itemId, quantity : 0, addons }) - 1
        } else {
          indexInCart = pureCartItemToApi.push({ product : itemId, quantity : 0 }) - 1
        }
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

      // return console.log(pureCartItemToApi)

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
