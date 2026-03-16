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
                    <h1>{{ $t('orderRecords') }}</h1>
                  </v-col>
                  <v-col cols="12 px-1 px-md-3">
                    <div class="px-4 d-flex mb-5">
                      <h4 class="font-600 grey--text text--darken-2 col-5 px-1">{{ $t('orderNumber') }}#</h4>
                      <h4 class="font-600 grey--text text--darken-2 col-3 px-1">{{ $t('orderDate') }}</h4>
                      <h4 class="font-600 grey--text text--darken-2 col-3 px-1">{{ $t('payment') }}</h4>
                      <h4 class="font-600 grey--text text--darken-2 col-1 px-1"></h4>
                      <!--                      <h4 class="font-600 grey&#45;&#45;text text&#45;&#45;darken-2 col-1"></h4>-->
                    </div>
                    <div class="text-center height-800" v-if="!result.results.length">{{ $t('noRecentOrdersMsg') }}</div>
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
                          <p class="mb-0">${{ order.paidTotal.toFixed(2) }}</p>
                        </div>
                        <div class="col-1 px-0 expandIcons">
                          <v-btn icon class="down" @click="toggleExpand(order)">
                            <v-icon>{{ icons.mdiChevronDown }}</v-icon>
                          </v-btn>
                          <v-btn icon class="up" @click="toggleExpand(order)">
                            <v-icon class="up">{{ icons.mdiChevronUp }}</v-icon>
                          </v-btn>
                        </div>

                        <div class="moreInfo col-12 py-0">
                          <div class="d-flex flex-wrap">
                            <div class="col-12 col-lg-3 col-md-4 py-0">
                              {{ getOrderTotalItemCnt(order.items) }}{{ $t('itemsQty') }}：
                              <template v-for="item in order.items">
                                <div>
                                  <v-img :src="item.product.images && item.product.images.length? item.product.images[0].small.path : ''" alt=""/>
                                  {{ item.product.name[$i18n.locale] }} x {{ item.quantity }}
                                </div>
                              </template>
                            </div>
                            <div class="col-12 col-lg-3 col-md-4 py-0">
                              <div>{{ $t('creditsEarned') }}：{{ order.creditsGained }}
                                <span class="text-12">({{ $t('1creditEquals1Dollar') }})</span></div>
                              <div>{{ $t('useCredits') }}：{{ order.creditsUsed }}</div>
                              <div>{{ $t('voucherApplied') }}：{{ order.voucherUsed ? order.voucherUsed.code : '--' }}</div>
                            </div>
                            <div class="col-12 col-lg-3 col-md-4 py-0">
                              <div>{{ $t('orderTotal') }}：${{ order.total.toFixed(2) }}</div>
                              <div>{{ $t('discountTotal') }}：-${{ (order.total - order.paidTotal).toFixed(2) }}</div>
                              <div>{{ $t('paidTotal') }}：${{ order.paidTotal.toFixed(2) }}</div>
                            </div>
                            <div class="col-12 py-2">
                              <template v-if="order.prize">
                                {{ $t('redPacket') }}：{{ order.prize.type === 'cash' ? '$' + order.prize.amount + $t('1xredPacket') : order.prize.product.name[$i18n.locale] + ' x' + order.prize.amount + $t('pieces') }}<br>
                              </template>
                              {{ $t('deliveryDateTime') }}：{{ order.deliveryDay }} ({{ order.deliveryTimeSlot }})<br>
                              {{ $t('deliveryMethod') }}： {{ $t(order.deliveryType) }}<br>
                              {{ $t('deliveryAddress') }}： {{ order.deliveryType === 'pickup' ? '(' + $t('pickup') + ') ' : '' }}{{ order.fullAddress }} ({{ $t('receiver') }}: {{ order.recipient }}, {{ order.phone }})
                            </div>
                            <div class="col-12 py-0">
                              <v-card elevation="0" outlined>
                                <v-card-title>{{ $t('orderTracking') }}</v-card-title>
                                <v-card-text>
                                  <template v-if="order.delivery.billNo">
                                    <v-progress-linear v-if="routesLoading" indeterminate color="green"></v-progress-linear>
                                    <template v-if="order.routes.length">
                                      <table>
                                        <tr>
                                          <th colspan="2" align="right">{{ $t('sfWayBill') }}: {{ order.delivery.billNo }}</th>
                                        </tr>
                                        <tr>
                                          <th>{{ $t('timeSlot') }}</th>
                                          <th>{{ $t('message') }}</th>
                                        </tr>
                                        <tr v-for="(route,index) in order.routes" :key="index">
                                          <td valign="top">
                                            <v-chip color="secondary" x-small> {{ route.acceptTime }}</v-chip>
                                          </td>
                                          <td>
                                            <div class="border-t">
                                              {{ route.remark }}
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </template>
                                    <template v-else>
                                      <div v-if="moment().isBefore(moment(order.deliveryDay))">
                                        {{ $t('shippingIsReady') }}<br>
                                        {{ $t('SFWayBill') }}: {{ order.delivery.billNo }}
                                      </div>
                                      <div v-else>{{ $t('orderTrackingEndedMsg') }}
                                        <br>
                                        <a :href="'https://htm.sf-express.com/hk/tc/dynamic_function/waybill/#search/bill-number/' + order.delivery.billNo" target="_blank">
                                          https://htm.sf-express.com/hk/tc/dynamic_function/waybill/#search/bill-number/{{ order.delivery.billNo }}
                                        </a>
                                      </div>
                                    </template>
                                  </template>
                                  <template v-else>
                                    <div>{{ $t('orderIsUnderProcessing') }}</div>
                                  </template>
                                </v-card-text>
                              </v-card>
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
    return { title : this.$t('myOrders') + ' myfridge' }
  },
  watch : {
    'result.page' : {
      handler () {
        this.myOrders()
      }
    }
  },
  created () {
    this.myOrders()
  },
  methods : {
    async getOrderRoute (orderNumber, accessCode) {
      try {
        this.routesLoading = true
        const detail = await this.$api.get('/v1/orders/sf/routes/' + orderNumber, { params : { accessCode } })
        // const detail = await this.$api.get('/v1/orders/sf/routes/OPT2023122839223', { params : { accessCode : 'JdjNMGVE0zdjzzWKkVPgG1VhZH74Jumn' } })
        if (detail.data) {
          if (detail.data.apiResultData.success) {
            this.result.results.forEach((item, index) => {
              if (item.orderNumber === orderNumber) {
                this.result.results[index].routes = []
                this.result.results[index].routes.push(..._.reverse(detail.data.apiResultData.msgData.routeResps[0].routes))
              }
            })
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.routesLoading = false
      }

    },
    async myOrders () {
      this.loading = true
      try {
        // this.result.results = []
        const params = { page : this.result.page, limit : this.result.limit }
        const result = await this.$api.get('/v1/orders/me', { params })
        this.result = result.data
        this.result.results = this.result.results.map(item => {
          return { ...item, routes : [] }
        })
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

    async toggleExpand (order) {
      const elm = document.getElementById(order.orderNumber)
      if (elm.classList.contains('expand')) {
        document.getElementById(order.orderNumber).classList.remove("expand")
      } else {
        document.getElementById(order.orderNumber).classList.add("expand")
        if (order.delivery.billNo) {
          await this.getOrderRoute(order.orderNumber, order.accessCode)
        }
      }
      return null
    }

  },
  data () {
    return {
      loading       : false,
      routesLoading : false,
      moment,
      icons         : { mdiChevronDown, mdiChevronUp, mdiChevronLeft, mdiChevronRight, mdiCheck },
      result        : {
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
