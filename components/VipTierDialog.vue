<template>
  <v-dialog v-model="show" max-width="100%" width="500">
    <v-card>
      <v-card-title class="text-h5 mb-4">myfridge {{ $t('memberTiers') }}</v-card-title>
      <v-card-text>
        <template v-if="$i18n.locale === 'zh'">
          <ol>
            <li>
              <div class="d-flex align-center">
                <div>黃金會員</div>
                <v-icon size="20" class="amber--text text--accent-4">{{ icons.mdiCrown }}</v-icon>
              </div>
              <ol style="list-style-type: upper-roman;">
                <li class="my-2">消費滿<b>HKD$1500</b>即自動成為黃金會員 (包括積分增值)。</li>
                <li class="my-2">所有貨品享有<b>永久減$1優惠</b>，可與其他優惠同時使用，例如多買多減／優惠碼折扣等。</li>
              </ol>
            </li>
            <li>
              <div class="d-flex align-center">
                <div>鑽石會員</div>
                <v-icon size="20" class="deep-purple--text text--lighten-1">{{ icons.mdiDiamondStone }}</v-icon>
              </div>
              <ol style="list-style-type: upper-roman;">
                <li class="my-2">消費滿<b>HKD$5000</b>即自動成為鑽石會員 (包括積分增值)。</li>
                <li class="my-2">享有黃金會員待遇。</li>
                <li class="my-2">每次下單獲得3倍積分，相當於額外97折。</li>
              </ol>
            </li>
            <li class="my-2">享有尊貴會員專享<b>優惠或產品</b>（如適用）。</li>
          </ol>
        </template>
        <template v-else>
          <ol>
            <li>
              <div class="d-flex align-center">
                <div>Golden Member</div>
                <v-icon size="20" class="amber--text text--accent-4">{{ icons.mdiCrown }}</v-icon>
              </div>
              <ol style="list-style-type: upper-roman;">
                <li class="my-2">When you spend <b>HKD$1500</b>, you will automatically become a golden member (including credit top up). </li>
                <li class="my-2">All products enjoy a <b>permanent $1 discount</b>, which can be used in conjunction with other offers, such as buy more, get more discounts/coupon code discounts, etc. </li>
              </ol>
            </li>
            <li>
              <div class="d-flex align-center">
                <div>Diamond Member</div>
                <v-icon size="20" class="deep-purple--text text--lighten-1">{{ icons.mdiDiamondStone }}</v-icon>
              </div>
              <ol style="list-style-type: upper-roman;">
                <li class="my-2">You will automatically become a diamond member when you spend <b>HKD$5000</b> (including credit top up). </li>
                <li class="my-2">Enjoy gold membership benefits. </li>
                <li class="my-2">Earn 3 times credits for ordering, which is equivalent to an additional 3% off. </li>
              </ol>
            </li>
            <li class="my-2">Enjoy exclusive member-only <b>offers or products</b> (if applicable). </li>
          </ol>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="close">{{ $t('close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mdiCrown, mdiDiamondStone} from "@mdi/js";

export default {
  name    : "VipTierDialog",
  methods : {
    open (title, message) {
      this.show = true
      this.message = message
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.reset()
      this.resolve(false)
    },
    reset () {
      this.show = false
      this.message = ''
    }
  },
  data    : () => ({
    show    : false,
    resolve : null,
    reject  : null,
    message : '',
    icons   : {
      mdiCrown,
      mdiDiamondStone
    }
  })
}
</script>
