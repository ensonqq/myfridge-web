<template>
  <!-- shopping cart button -->
  <v-btn @click="toggleShoppingCartDrawer(true)" v-bind="$attrs" class="pl-0">
    <v-badge color="secondary"
             v-if="getCheckOutQty"
             :content="getCheckOutQty">
      <v-icon size="22">{{ icons.mdiCartOutline }}</v-icon>
    </v-badge>
    <v-icon size="22" v-else>{{ icons.mdiCartOutline }}</v-icon>
  </v-btn>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {mdiCartOutline}         from "@mdi/js"

export default {
  name     : "CartButton",
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
      mdiCartOutline
    }
  })
}
</script>
