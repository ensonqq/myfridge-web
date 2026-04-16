<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="mb-1">
          <AccountHeader></AccountHeader>
        </v-col>
        <v-col cols="12">
          <Box class="dashboard-box">
            <div slot="boxSidebar">
              <DashboardSidebar/>
            </div>
            <div slot="boxContent">
              <div class="px-lg-10 height-800">
                <v-row>
                  <v-col cols="12">
                    <h1>{{ $t('topupRecords') }}</h1>
                  </v-col>
                  <v-col cols="12 px-1 px-md-3">
                    <div class="px-1 d-flex mb-5">
                      <h4 class="font-600 grey--text text--darken-2 col-5 px-1">{{ $t('orderNumber') }}#</h4>
                      <h4 class="font-600 grey--text text--darken-2 col-3 px-1">{{ $t('orderDate') }}</h4>
                      <h4 class="font-600 grey--text text--darken-2 col-3 px-1">{{ $t('payment') }}</h4>
                      <h4 class="font-600 grey--text text--darken-2 col-1 px-1"></h4>
                      <!--                      <h4 class="font-600 grey&#45;&#45;text text&#45;&#45;darken-2 col-1"></h4>-->
                    </div>
                    <div class="text-center height-800" v-if="!result.results.length">{{ $t('noTopupRecordsMsg') }}</div>
                    <v-card elevation="0"
                            class="border br-10 mb-4"
                            :loading="loading"
                            v-for="(order, index) in result.results"
                            :key="index">
                      <div class="pa-1 d-flex align-center flex-wrap orderRow" :id="order.orderNumber">
                        <div class="col-5 px-1">
                          <h4 class="font-600 mb-0 text-12 text-md-h6">
                            <v-icon color="green darken-3">{{ icons.mdiCheck }}</v-icon>
                            {{ order.orderNumber }}
                          </h4>
                        </div>
                        <div class="col-3 px-1">
                          <p class="mb-0">{{ moment(order.createdAt).format('YYYY-MM-DD') }}</p>
                        </div>
                        <div class="col-3 px-1">
                          <p class="mb-0">${{ order.price.toFixed(2) }}</p>
                        </div>
                        <div class="col-1 px-0 expandIcons">
                          <v-btn icon class="down" @click="toggleExpand(order)">
                            <v-icon>{{ icons.mdiChevronDown }}</v-icon>
                          </v-btn>
                          <v-btn icon class="up" @click="toggleExpand(order)">
                            <v-icon class="up">{{ icons.mdiChevronUp }}</v-icon>
                          </v-btn>
                        </div>

                        <!--                        <div class="col-1 px-0 expandIcons">
                                                  <v-btn icon class="down" @click="toggleExpand(order.orderNumber)">
                                                    <v-icon>{{ icons.mdiChevronDown }}</v-icon>
                                                  </v-btn>
                                                  <v-btn icon class="up" @click="toggleExpand(order.orderNumber)">
                                                    <v-icon class="up">{{ icons.mdiChevronUp }}</v-icon>
                                                  </v-btn>
                                                </div>-->

                        <div class="moreInfo col-12">
                          <div class="d-flex flex-wrap">
                            <div class="col-12 col-lg-3">
                              <div>
                                <div class="mb-2">
                                  {{ order.topupCard.name[$i18n.locale] }}({{ order.topupCard.title[$i18n.locale] }}) x 1
                                </div>
                                <v-img :src="order.topupCard.images[0].small.path" alt=""/>
                              </div>
                            </div>
                            <div class="col-12 col-lg-3">
                              {{ $t('topupTime') }}：
                              <div>{{ moment(order.updatedAt).format('YYYY-MM-DD HH:mm') }}</div>
                            </div>
                            <div class="col-12 col-lg-3">
                              {{ $t('usage') }}： {{ order.topupCard.desc[$i18n.locale] }}
                            </div>
                            <div class="col-12 col-lg-3">
                              <div>{{ $t('paidTotal') }}：${{ order.price.toFixed(2) }}</div>
                              <div>{{ $t('discountTotal') }}：--</div>
                              <div>{{ $t('creditsEarned') }}：{{ order.topupValue }}
                                <span class="text-12">({{ $t('1creditEquals1Dollar') }})</span></div>
                              <div>{{ $t('useCredits') }}：--</div>
                              <div>{{ $t('voucherApplied') }}：--</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <div class="d-flex justify-center align-center justify-sm-space-between flex-wrap">
                      <div class="mb-4 me-3">
                        <p class="font-weight-normal mb-0 text-14">{{ (result.page - 1) * result.limit + 1 }} {{ $t('to') }} {{ result.page * result.limit }} ({{ $t('totalShort') }}{{ result.totalResults }}{{ $t('xResults') }})</p>
                      </div>
                      <div class="mb-4">
                        <v-pagination class="food-truck-pagination"
                                      color="secondary"
                                      v-model="result.page"
                                      :next-icon="icons.mdiChevronRight"
                                      :prev-icon="icons.mdiChevronLeft"
                                      :length="result.totalPages"
                                      circle></v-pagination>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </Box>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import {mdiChevronDown, mdiChevronUp, mdiChevronLeft, mdiChevronRight, mdiCheck} from "@mdi/js"
import moment                                                                    from 'moment'
import _                                                                         from "lodash";

export default {
  layout : 'auth',
  head () {
    return { title : this.$t('topupRecords') + ' MyFridge' }
  },
  watch : {
    'result.page' : {
      handler () {
        this.myTopupOrders()
      }
    }
  },
  created () {
    this.myTopupOrders()
  },
  methods : {
    async myTopupOrders () {
      this.loading = true
      try {
        // this.result.results = []
        const params = { page : this.result.page, limit : this.result.limit }
        const result = await this.$api.get('/v1/topups/me', { params })
        this.result = result.data
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    getOrderTotalItemCnt (items) {
      return _.sumBy(items, function (o) {
        return o.quantity
      });
    },

    toggleExpand ({ orderNumber }) {
      const elm = document.getElementById(orderNumber)
      if (elm.classList.contains('expand')) {
        document.getElementById(orderNumber).classList.remove("expand");
      } else {
        document.getElementById(orderNumber).classList.add("expand");
      }
    }

  },
  data () {
    return {
      loading : false,
      moment,
      icons   : { mdiChevronDown, mdiChevronUp, mdiChevronLeft, mdiChevronRight, mdiCheck },
      result  : {
        page         : 1,
        totalPages   : 1,
        totalResults : 0,
        limit        : 20,
        results      : []
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.orderRow {
  &.expand {
    .moreInfo {
      display: block;
    }

    .expandIcons {
      .down {
        display: none;
      }

      .up {
        display: block;
      }
    }
  }
}


.orderRow {
  .moreInfo {
    display: none;
  }
}

.expandIcons {

  .down {
    display: block;
  }

  .up {
    display: none;
  }
}
</style>
