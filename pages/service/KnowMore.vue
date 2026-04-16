<template>
  <v-container>
    <v-row>
      <v-col class="height-1500">
        <h1>{{ $t('Q&A') }}</h1>
        <template v-if="$i18n.locale === 'zh'">
          <ul>
            <li class="py-2">如因未能聯絡客戶導致MyFridge 無法於送貨日送到，冷凍運輸公司將於翌日重新安排派送。如翌日仍然未能聯絡客戶或安排運送，將視為放棄有關訂單，MyFridge 將不作任何保償。</li>
            <li class="py-2">如因聯絡資料錯誤導致冷凍運輸公司派送失敗，MyFridge 將視為放棄有關訂單及不作任何保償。</li>
            <li class="py-2">食物在到達後，如一段時間無人看管而可能產生的所有責任，包括 : 遺失、污染及未能保持冷凍食物的溫度變化，MyFridge和第三方冷凍運輸公司均不會承擔。</li>
          </ul>
        </template>
        <template v-else>
          <ul>
            <li class="py-2">If MyFridge cannot be delivered on the delivery day due to failure contact to the customer, the courier company will reschedule to deliver in next day. If the customer is still unable to be contacted or shipped in the next day, the order will is regarded as giving up and MyFridge will not provide any compensation.</li>
            <li class="py-2">If the courier company fails to deliver due to incorrect contact information, it is regarded as giving up, and
              no compensation is provided.
            </li>
            <li class="py-2">All liabilities that may arise if food is left unattended for a period of time after arrival, including: loss, contamination, and failure to maintain temperature changes, MyFridge and third-party courier company are not liable for failure occurring as a result .</li>
          </ul>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name : "KnowMore",
  head () {
    return {
      title : this.$t('Q&A') + ' MyFridge',
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
