<template>
  <div>
    <div class="border border br-10">
      <h1 class="grey--text text-12 pa-5 text-uppercase font-weight-regular">{{ $t('account') }}</h1>
      <div>
        <nuxt-link to="/dashboard/Account" class="dashboard-sidebar-link">
          <div class=" px-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon size="18" class="me-2">{{ icons.mdiAccountCircleOutline }}</v-icon>
              <p class="mb-0">{{ $t('myAccount') }}</p>
            </div>
          </div>
        </nuxt-link>

        <nuxt-link to="/dashboard/OrderList" class="dashboard-sidebar-link">
          <div class=" px-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon size="18" class="me-2">{{ icons.mdiListBoxOutline }}</v-icon>
              <p class="mb-0">{{ $t('orderRecords') }}</p>
            </div>
          </div>
        </nuxt-link>

        <nuxt-link to="/dashboard/TopupList" class="dashboard-sidebar-link">
          <div class=" px-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon size="18" class="me-2">{{ icons.mdiListBoxOutline }}</v-icon>
              <p class="mb-0">{{ $t('topupRecords') }}</p>
            </div>
          </div>
        </nuxt-link>

        <nuxt-link to="/dashboard/ChangePassword" class="dashboard-sidebar-link">
          <div class=" px-4 d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon size="18" class="me-2">{{ icons.mdiLockOutline }}</v-icon>
              <p class="mb-0">{{ $t('changePassword') }}</p>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mdiLockOutline, mdiMapMarker, mdiAccountCircleOutline, mdiListBoxOutline, mdiCurrencyUsd} from "@mdi/js"
import {mapState}                                                                                 from "vuex";

export default {
  computed : {
    ...mapState(['user'])
  },
  data () {
    return {
      icons : {
        mdiLockOutline, mdiMapMarker, mdiAccountCircleOutline, mdiListBoxOutline,
        mdiCurrencyUsd
      }
    }
  }
}
</script>
