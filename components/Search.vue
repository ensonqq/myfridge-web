<template>
  <v-autocomplete v-model="itemSku"
                  class="ma-0 px-2 pt-md-0 pt-lg-0 pt-4 pb-6 searchItem"
                  color="secondary"
                  :loading="searchLoading"
                  :items="resultSearchItem"
                  :search-input.sync="searchInput"
                  dense
                  hide-details
                  hide-selected
                  outlined
                  attach
                  ref="autocomplete"
                  :cache-items="true"
                  :item-text="`name[${$i18n.locale}]`"
                  :item-value="`name[${$i18n.locale}]`"
                  :prepend-inner-icon="icons.mdiMagnify"
                  @change="handleResultClick"
                  return-object>
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>{{ $t('nodata') }}</v-list-item-title>
      </v-list-item>
    </template>
    <!-- Customizing the Dropdown List Item -->
    <template v-slot:item="{ item }">
      <v-list-item-avatar>
        <img :src="item.images.length? item.images[0].medium.path: 'https://placehold.co/400'" alt="Avatar">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title  v-html="item.name[$i18n.locale]"></v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-slot:append>
      <v-icon @click="clearSearch" style="cursor: pointer">
        {{ icons.mdiClose }}
      </v-icon>
    </template>
  </v-autocomplete>
</template>

<script>
import {mdiClose, mdiMagnify} from "@mdi/js";

export default {
  name : 'Search',
  data : () => ({
    //search bar
    itemSku          : null,
    searchLoading    : false,
    resultSearchItem : [],
    searchInput      : null,

    icons : {
      mdiMagnify,
      mdiClose
    }
  }),

  watch : {
    // Watches the user input and triggers the search
    searchInput (val) {
      this.resultSearchItem = []
      if (val && val !== this.itemSku) {
        this.searchData(val)
      }
    }
  },

  methods : {
    // Simulating an API call
    handleResultClick () {
      if (!this.itemSku) return
      // this.$router.push('/product/' + window.encodeURI(this.itemSku.name.zh));
      const productName = window.encodeURI(this.itemSku.name.zh)
      this.$router.push('/product/' + window.encodeURI(productName));
      this.$emit('openProductDetail', window.encodeURI(productName))
    },
    clearSearch () {
      this.itemSku = null
      this.searchInput = ''
      this.resultSearchItem = []
    },
    searchData : _.debounce(async function () {
      const t = this
      try {
        t.searchLoading = true
        t.resultSearchItem = []
        const searchProducts = await this.$api.get('/v1/products?search=' + t.searchInput)
        if (searchProducts && searchProducts.data) {
          t.resultSearchItem = searchProducts.data.results
        }
      } catch (e) {
        console.log(e)
      } finally {
        t.searchLoading = false
      }
    }, 1000),
  },
};
</script>
