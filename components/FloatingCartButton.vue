<template>
  <!--    floating cart button-->
  <v-btn v-show="getCheckOutQty > 0" class="mx-2 checkout-floating-btn" bottom fixed right fab dark color="secondary" @click="toggleShoppingCartDrawer(true)" v-bind="$attrs">
    <v-badge color="secondary"
             v-if="getCheckOutQty"
             :content="getCheckOutQty">
      <v-icon size="24">{{ icons.mdiCartArrowRight }}</v-icon>
    </v-badge>
  </v-btn>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {mdiCartArrowRight}      from "@mdi/js"

export default {
  name     : "FloatingCartButton",
  computed : {
    ...mapState(['cart']),
    getCheckOutQty () {
      const qty = _.sumBy(this.cart, function (item) {
        if (!item.product.publish || item.product.soldOut) {
          return 0
        } else {
          return _.toInteger(item.quantity)
        }
      })
      return qty
    }
  },
  methods  : {
    ...mapMutations(['toggleShoppingCartDrawer']),
  },
  data     : () => ({
    icons : {
      mdiCartArrowRight
    }
  })
}
</script>
