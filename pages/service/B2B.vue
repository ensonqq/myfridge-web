<template>
  <v-container>
    <v-row>
      <v-col class="height-1500">
        <h1>{{ $t('businessCooperation') }}</h1>
        <template v-if="$i18n.locale === 'zh'">
          <h3 class="mb-4">為何選擇 myfridge 為您的合作夥伴</h3>
          <ul style="list-style: none">
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiHomeCityOutline }}</v-icon>
              本地生產，本地品牌
              <ul>
                <li>myfridge為本地知名凍肉品牌。</li>
              </ul>
            </li>
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiMedal }}</v-icon>
              超卓的產品質素
              <ul>
                <li>食品加工程序衛生品質高，味道好，享負盛名於香港地區，客戶信心保證。</li>
              </ul>
            </li>
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiBatteryCharging }}</v-icon>
              最怕缺貨情況出現？不用怕！
              <ul>
                <li>我們有專業冷凍貨運團隊，確保每天天都有供貨，無論何時何地我們都能確保新鮮及準時送達目的地。</li>
              </ul>
            </li>
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiSilverwareForkKnife }}</v-icon>
              讓您為客人提供更多元化食品
              <ul>
                <li>讓您更快捷地準備客人的用餐。</li>
              </ul>
            </li>
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiTruckFast }}</v-icon>
              批發可多點送貨
              <ul>
                <li>myfridge可為您安排多個送貨點，直達您的不同分店地址！</li>
              </ul>
            </li>
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiChartBar }}</v-icon>
              多款健康產品選擇
              <ul>
                <li>讓您為客人提供更多選擇。</li>
              </ul>
            </li>
          </ul>
          <p class="pt-8">
            所有商業合作及批發歡迎透過以下聯絡方式直接聯絡我們。
          </p>
          <p>
            <v-icon>{{ icons.mdiEmailOutline }}</v-icon>
            <span>
            : <a href="mailto:info@myfridgehk.com">info@myfridgehk.com</a>
          </span>
          </p>
          <p class="d-flex justify-start align-center">
            <v-icon>{{ icons.mdiWhatsapp }}</v-icon>
            <span class="ml-1">
            : <a href="https://wa.me/+85255703607">55703607</a>
          </span>
          </p>
        </template>
        <template v-else>
          <h3 class="mb-4">Why choose myfridge as your partner</h3>
          <ul style="list-style: none">
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiHomeCityOutline }}</v-icon>
              Local production, local brand
              <ul>
                <li>myfridge is a well-known local healthy food brand, and its instant/ready-to-eat chicken breast ranks no.1 in sales in Hong Kong.</li>
              </ul>
            </li>
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiMedal }}</v-icon>
              Excellent product quality
              <ul>
                <li>Food production under high hygienic and perfect condition. It is well-known in Hong Kong and customer confidence and complements is guaranteed.</li>
              </ul>
            </li>
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiBatteryCharging }}</v-icon>
              Never being afraid of out of stock!
              <ul>
                <li>We have a professional logistic team (temperature control) to ensure every delivery is on time every day. We can ensure freshness and on-time delivery to the destination no matter when and where.</li>
              </ul>
            </li>
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiSilverwareForkKnife }}</v-icon>
              Provide diverse food varieties to your customers
              <ul>
                <li>Allows you to provide diverse meals for your guests.</li>
              </ul>
            </li>
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiTruckFast }}</v-icon>
              Wholesale can be delivered to multiple locations
              <ul>
                <li>myfridge can arrange multiple deliveries, which deliver directly to all your offline stores!</li>
              </ul>
            </li>
            <li class="mb-7">
              <v-icon class="mr-1 mb-2" style="margin-left: -10px;">{{ icons.mdiChartBar }}</v-icon>
              Various health product choices
              <ul>
                <li>Allows you to offer your guests more choices.</li>
              </ul>
            </li>
          </ul>
          <p class="pt-8">
            For all business cooperation and wholesale, please contact us directly through the following contact information.
          </p>
          <p>
            <v-icon>{{ icons.mdiEmailOutline }}</v-icon>
            <span>: <a href="mailto:info@myfridgehk.com">info@myfridgehk.com</a></span>
          </p>
          <p class="d-flex justify-start align-center">
            <v-icon>{{ icons.mdiWhatsapp }}</v-icon>
            <span class="ml-1">: <a href="https://wa.me/+85255703607">55703607</a></span>
          </p>
        </template>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  mdiWhatsapp,
  mdiEmailOutline,
  mdiHomeCityOutline,
  mdiMedal,
  mdiSilverwareForkKnife,
  mdiBatteryCharging,
  mdiTruckFast,
  mdiChartBar
} from '@mdi/js'

export default {
  name : "B2B",
  head () {
    return {
      title : this.$t('businessCooperation')  + ' myfridge',
    }
  },
  data () {
    return {
      icons : {
        mdiWhatsapp, mdiEmailOutline, mdiHomeCityOutline, mdiMedal, mdiSilverwareForkKnife, mdiBatteryCharging,
        mdiTruckFast, mdiChartBar
      }
    }
  },
}
</script>

<style scoped lang="scss">
h3 {
  margin-top: 35px;
}

h4 {
  margin-top: 20px;
}

p {
  margin: 0 0 8px 5px;
}
</style>
