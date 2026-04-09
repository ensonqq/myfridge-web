<template>
  <v-container>
    <v-row>
      <v-col class="height-1500">
        <h1 class="py-2">{{ $t('aboutUs') }}</h1>
        <p class="py-2">
          <v-img :src="require('~/assets/images/team-resized.jpg')"></v-img>
        </p>
        <template v-if="$i18n.locale === 'zh'">
          <p class="py-2">My Fridge 是一家本地急凍食品進口和分銷商， 母公司自設大型衛生加工工場，專門供應各類型優質食材。我們的產品主要從美，加，澳，紐等國家入口。本店提供安心可靠的網上購物服務，可讓您安坐家中便可享受環球優質美食。</p>

          <p class="py-2">My Fridge 母公司滿記凍肉有限公司是一間香港注冊的有限公司，已在火炭區成立多年，一直與多間本地連鎖餐廳食肆合作，處理凍肉經驗豐富。本店已領取食環署的許可證，並已取得 ISO 22000:2018 和 HACCP 証書，食品來源和處理均有保證。</p>

          <p class="py-2">顧客惠顧滿$300就可以享用免費冷凍運輸送貨，今天確認訂單，最快後天送到，港九新界地區均可。</p>

          <p class="py-2">受限制食物售賣牌照 / 許可證號碼：0397802900</p>
        </template>
        <template v-else>
          <p class=" py-2">My Fridge is a Hong Kong local frozen food importer and distributor. The parent company has its own large-scale sanitary processing workshop, which specializes in supplying various types of high-quality food. Our products are mainly imported from the United States, Canada, Australia, New Zealand and other countries. Our shop’s reliable and secure online shopping service allows you to enjoy sophisticated global cuisine at home.</p>

          <p class="py-2">My Fridge's parent company, Moon Kee Frozen Meat Limited, is a limited company registered in Hong Kong, which has been established in Fo Tan District for many years. It is closely cooperating with many local chain restaurants and restaurants and has rich experience in handling frozen meat and seafood. The shop is licensed by the Food and Environmental Hygiene Department and has recently obtained ISO 22000:2018 and HACCP certifications, which ensure food sourcing and uphold high hygiene standards.</p>

          <p class="py-2">Restricted Food Permit Licence /Permit No: 0397802900</p>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name : "About",
  head () {
    return {
      title : this.$t('aboutUs') + ' myfridge',
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
