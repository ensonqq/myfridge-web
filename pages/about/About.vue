<template>
  <v-container>
    <v-row>
      <v-col class="height-1500">
        <!--        <h1 class="py-2">{{ $t('aboutUs') }}</h1>-->
        <template v-if="$i18n.locale === 'zh'">
          <v-img width="100%" :src="require('~/assets/images/about-zh.jpg')"></v-img>
          <h1 class="py-2 pt-5 amber--text text--darken-3">品牌故事</h1>

          <p class="py-2">My Fridge 是一家本地急凍食品進口和分銷商， 母公司自設大型衛生加工工場，專門供應各類型優質食材。我們的產品主要從美，加，澳，紐等國家入口。本店提供安心可靠的網上購物服務，可讓您安坐家中便可享受環球優質美食。</p>

          <p class="py-2">My Fridge 母公司滿記凍肉有限公司是一間香港注冊的有限公司，已在火炭區成立多年，一直與多間本地連鎖餐廳食肆合作，處理凍肉經驗豐富。本店已領取食環署的許可證，並已取得 ISO 22000:2018 和 HACCP 証書，食品來源和處理均有保證。</p>

          <p class="py-2">顧客惠顧滿$300就可以享用免費冷凍運輸送貨，今天確認訂單，最快後天送到，港九新界地區均可。</p>

          <h1 class="py-2 pt-6 amber--text text--darken-3">品牌里程</h1>


          <ul class="about-milestone">
            <li>1997 母公司滿記凍肉成立</li>
            <li>2012 新廠房落成</li>
            <li>2016 擴展廠房，並與大型連鎖餐廳合作</li>
            <li>2020 成立品牌 My Fridge，正式拓展網上零售業務</li>
            <li>2024 廠房榮獲 ISO 22000 及 HACCP 國際品質管理與食品安全管理體系認證</li>
          </ul>


          <h1 class="py-2 pt-6 amber--text text--darken-3">受限制食物售賣牌照/許可證號碼</h1>
          <p class="py-2">網上售賣 預先包裝供不經烹煮而食用的蠔<br>
            0397802919
          </p>

          <p class="py-2">網上售賣 預先包裝冷凍(冰鮮) 及/或冷藏魚<br>
            0397802955
          </p>

          <p class="py-2">網上售賣 預先包裝冷藏及/或進口冰鮮家禽<br>
            0397802937
          </p>

          <p class="py-2">網上售賣 預先包裝冷凍(冰鮮) 及/或冷藏肉類 (豬 牛 羊)<br>
            0397802900
          </p>

          <p class="py-2">網上售賣 預先包裝冷藏野味<br>
            0397802876
          </p>

          <p class="py-2">網上售賣 預先包裝冷凍(冰鮮) 及/或冷藏介貝類水產動物<br>0397802928
          </p>
        </template>
        <template v-else>
          <v-img width="100%" :src="require('~/assets/images/about-en.jpg')"></v-img>

          <h1 class="py-2 pt-5 amber--text text--darken-3">Brand Story</h1>

          <p class=" py-2">My Fridge is a Hong Kong local frozen food importer and distributor. The parent company has its own large-scale sanitary processing workshop, which specializes in supplying various types of high-quality food. Our products are mainly imported from the United States, Canada, Australia, New Zealand and other countries. Our shop’s reliable and secure online shopping service allows you to enjoy sophisticated global cuisine at home.</p>

          <p class="py-2">My Fridge's parent company, Moon Kee Frozen Meat Limited, is a limited company registered in Hong Kong, which has been established in Fo Tan District for many years. It is closely cooperating with many local chain restaurants and restaurants and has rich experience in handling frozen meat and seafood. The shop is licensed by the Food and Environmental Hygiene Department and has recently obtained ISO 22000:2018 and HACCP certifications, which ensure food sourcing and uphold high hygiene standards.</p>

          <h1 class="py-2 pt-5 amber--text text--darken-3">Brand Milestone</h1>
          <ul class="about-milestone">
            <li>1997 Moon Kee Frozen Meat was established</li>
            <li>2012 Set up the new production plant</li>
            <li>2016 Expand our facilities and partner with major restaurant chains</li>
            <li>2020 Launched "My Fridge" brand officially expanded into online retail</li>
            <li>2024 Production plant was awarded ISO22000 and HACCP</li>
          </ul>

          <h1 class="py-2 pt-5 amber--text text--darken-3">List of Licensed / Permitted Food Premises by Licence</h1>

          <p class="py-2">Online Sale of Prepackaged Oysters to be Eaten in Raw State<br>
            0397802919</p>

          <p class="py-2">Online Sale of Prepackaged Chilled and Frozen Fish<br>
            0397802955</p>

          <p class="py-2">Online Sale of Prepackaged Frozen and Imported Chilled Poultry<br>
            0397802937</p>

          <p class="py-2">Online Sale of Prepackaged Chilled and Frozen Meat (Chilled : Beef, Pork, Mutton Frozen: Beef, Pork, Mutton)<br>
            0397802900</p>

          <p class="py-2">Online Sale of Prepackaged Frozen Game<br>
            0397802876</p>

          <p class="py-2">Online Sale of Prepackaged Chilled and Frozen Shell Fish<br>
            0397802928</p>

        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name : "About",
  data : () => ({
    years : [
      {
        color   : 'cyan',
        year    : '1997',
        content : { zh : '母公司滿記凍肉成立', en : 'Moon Kee Frozen Meat was established' },
      },
      {
        color   : 'green',
        year    : '2012',
        content : { zh : '新廠房落成', en : 'Set up the new production plant' }
      },
      {
        color   : 'pink',
        year    : '2016',
        content : {
          zh : '擴展廠房，並與大型連鎖餐廳合作', en : 'Expand our facilities and partner with major restaurant chains'
        }
      },
      {
        color   : 'amber',
        year    : '2020',
        content : {
          zh : '成立品牌 My Fridge，正式拓展網上零售業務',
          en : 'Launched "My Fridge" brand officially expanded into online retail'
        }
      },
      {
        color   : 'orange',
        year    : '2024',
        content : {
          zh : '廠房榮獲 ISO 22000 及 HACCP 國際品質管理與食品安全管理體系認證',
          en : 'Production plant was awarded ISO22000 and HACCP'
        }
      },
    ],
  }),
  head () {
    return {
      title : this.$t('aboutUs') + ' MyFridge',
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
