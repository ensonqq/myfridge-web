<template>
  <v-container>
    <v-row>
      <v-col class="height-1500">
        <h1>{{ $t('faq') }}</h1>
        <template v-if="$i18n.locale === 'zh'">
          <ol class="py-5">
            <li class="py-2">
              <div><b>需要運費嗎？</b></div>
              <div>每張訂單只需要購買滿$99，即免運費。</div>
            </li>

            <li class="py-2">
              <div><b>快遞公司如何送貨？</b></div>
              <div>快遞公司在送貨前30分鐘會電話聯絡您，如果地址沒有人接收，他們會跟您商討再派送安排，物件會返回冷凍車並儲存於 -4℃ 至 -18℃ 低溫環境。</div>
            </li>

            <li class="py-2">
              <div><b>如何在自取點取貨？</b></div>
              <div>下單時只需選擇自取點取貨，貨品到達自取點後會收到SMS提示取貨。</div>
            </li>

            <li class="py-2">
              <div><b>送貨範圍覆蓋全香港嗎？</b></div>
              <div>我們送貨範圍覆蓋大部份香港、九龍、新界住宅或辦公室，除部份地區外，詳情請參閱
                <a :href="$t('sfCoverageUrl')" target="_blank">送上您府上</a>。
              </div>
            </li>

            <li class="py-2">
              <div><b>什麼時間送貨？</b></div>
              <div> 由2020年7月27日或以後訂單送貨時間為9am-7pm, 實際派送時間由順豐送貨員致電客戶預約，詳情請參閱
                <a :href="$t('sfCoverageUrl')" target="_blank">送上您府上</a>。
              </div>
            </li>

            <li class="py-2">
              <div><b>我幾時可以收到貨？</b></div>
              <div>您可以在選購時選取送貨日子「由兩日內送抵起」，請留意公眾假期不是我們的工作天，因此公眾假期後一日不設收貨日。</div>
            </li>

            <li class="py-2">
              <div><b>運送過程貨品是否保持低溫？</b></div>
              <div>MyFridge 全程以冷凍保鮮「攝氏-4℃ 至 -18℃」配送到府上。</div>
            </li>

            <li class="py-2">
              <div><b>商家退款處理？</b></div>
              <div>經協商退款成功後，款項會於7-14個工作天內沿客戶付款方式退回。</div>
            </li>

            <li class="py-2">
              <div><b>燒賣包裝如何？</b></div>
              <div>每盒淨重量180g，有6粒。</div>
            </li>

            <li class="py-2">
              <div><b>收貨後如何保存？</b></div>
              <div>存放冰格-4℃ 至 -18℃保存。</div>
            </li>

            <li class="py-2">
              <div><b>現在下單最快幾時收貨？</b></div>
              <div>下單時可於網站選擇收貨日，加一個工作天可安排派件，如需週末派件，只需加收$10服務費</div>
            </li>

            <li class="py-2">
              <div><b>如何聯絡運輸？</b></div>
              <div>客人可先提前下載SF app，運輸(順豐)會於收件後發出SMS 及 於App 自動發出出貨通知，收貨日早上便能查看到派件司機電話</div>
            </li>
            <li class="py-2">如因未能聯絡客戶導致MyFridge 無法於送貨日送到，冷凍運輸公司將於翌日重新安排派送。如翌日仍然未能聯絡客戶或安排運送，將視為放棄有關訂單，MyFridge 將不作任何保償。</li>

            <li class="py-2">如因聯絡資料錯誤導致冷凍運輸公司派送失敗，MyFridge 將視為放棄有關訂單及不作任何保償。</li>

            <li class="py-2">貨品送達後，如因為一段時間無人看管而可能產生的所有責任，包括 : 遺失、污染及未能保持冷凍食物的溫度變化，MyFridge和第三方冷凍運輸公司均不會承擔。</li>
          </ol>
        </template>
        <template v-else>
          <ol class="py-5">
            <li class="py-2">
              <div><b>Is there any shipping fee required? </b></div>
              <div>Each order only requires a purchase of $99 or more to have free shipping.</div>
            </li>

            <li class="py-2">
              <div><b>How does the courier company deliver goods? </b></div>
              <div>The courier company will contact you by phone 30 minutes before delivery. If there is no one at the address to receive it, they will discuss re-delivery arrangements with you. The items will be returned to the refrigerated truck and stored in a low temperature environment of -4℃ to -18℃.</div>
            </li>

            <li class="py-2">
              <div><b>How to pick up the goods at the self-pickup point? </b></div>
              <div>When placing an order, you can select a self-pickup point to pick up the goods. Once the goods arrive at the self-pickup point, you will receive an SMS reminder to pick up the goods.</div>
            </li>

            <li class="py-2">
              <div><b>Does the delivery area cover all Hong Kong areas? </b></div>
              <div>Our delivery area covers most residences or offices in Hong Kong, Kowloon and the New Territories, except for some areas, please refer to
                <a :href="$t('sfCoverageUrl')" target="_blank">Delivered to your door</a>.
              </div>
            </li>

            <li class="py-2">
              <div><b>When will order be delivered? </b></div>
              <div> The delivery time for orders placed on or after July 27, 2020 is 9am-7pm. The actual delivery time will be made by the SF Express delivery person calling the customer to make an appointment. For details, please refer to
                <a :href="$t('sfCoverageUrl')" target="_blank">Delivered to your door</a>.
              </div>
            </li>

            <li class="py-2">
              <div><b>When can I receive the goods? </b></div>
              <div>You can select the delivery date "from within two days" when purchasing. Please note that public holidays are not our working days, so there is no delivery day on the day after a public holiday.</div>
            </li>

            <li class="py-2">
              <div><b>Are the goods kept in low temperature during transportation? </b></div>
              <div>MyFridge is delivered to your home in a frozen and fresh state of -4℃ to -18℃.</div>
            </li>

            <li class="py-2">
              <div><b>Refund processing</b></div>
              <div>After successful refund negotiation, the money will be refunded to the customer's payment method within 7-14 working days.</div>
            </li>

            <li class="py-2">
              <div><b>What about the packaging of Siu Mai? </b></div>
              <div>Each box has a net weight of 180g and contains 6 pieces.</div>
            </li>

            <li class="py-2">
              <div><b>How to store the goods after receiving them? </b></div>
              <div>Store in low temperature (-4℃ to -18℃).</div>
            </li>

            <li class="py-2">
              <div><b>When is the fastest time to receive the goods if you place an order now? </b></div>
              <div>When placing an order, you can select the delivery date on the website, orders will be delivered in 2 working days. $10 service fee will be charged if delivery is required on weekends.</div>
            </li>

            <li class="py-2">
              <div><b>How to track the shipment? </b></div>
              <div>Guests can download the SF app in advance, and the transportation company (SF Express) will send an SMS and a shipping notification automatically on the App after receiving the goods. You can check the delivery driver’s phone number in the morning of the day of delivery</div>
            </li>
            <li class="py-2">If order cannot be delivered on the delivery day due to failure to contact the customer, the courier company will reschedule the delivery on the next day. If the customer is still unable to be contacted or shipped the next day, the order is regarded as giving up and MyFridge will not provide any compensation.</li>

            <li class="py-2">If the courier company fails to deliver due to incorrect contact information, it is regarded as giving up, and
              no compensation is provided.
            </li>

            <li class="py-2">All liabilities that may arise if food is left unattended for a period of time after arrival, including: loss, contamination, and failure to maintain temperature changes, MyFridge and third-party courier company are not liable for failure occurring as a result .</li>
          </ol>
        </template>
      </v-col>
    </v-row>
    <script type="application/ld+json">
    {
      "@context"  : "https://schema.org",
      "@type"     : "FAQPage",
      "mainEntity": [
        {
          "@type"         : "Question",
          "name"          : "需要運費嗎？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text" : "每張訂單只需要購買滿$100，即免運費。"
          }
        }, {
          "@type"         : "Question",
          "name"          : "快遞公司如何送貨？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text" : "快遞公司在送貨前30分鐘會電話聯絡您，如果地址沒有人接收，他們會跟您商討再派送安排，物件會返回冷凍車並儲存於 -4℃ 低溫環境。"
          }
        }, {
          "@type"         : "Question",
          "name"          : "送貨範圍覆蓋全香港嗎？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text" : "我們送貨範圍覆蓋大部份香港、九龍、新界住宅或辦公室，除部份地區外，詳情請參閱 送上您府上。"
          }
        }, {
          "@type"         : "Question",
          "name"          : "什麼時間送貨？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text" : "由2020年7月27日或以後訂單送貨時間為9am-7pm, 實際派送時間由順豐送貨員致電客戶預約，詳情請參閱 送上您府上。"
          }
        }, {
          "@type"         : "Question",
          "name"          : "我幾時可以收到貨？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text" : "您可以在選購時選取送貨日子「由兩日內送抵起」，請留意公眾假期不是我們的工作天，因此公眾假期後一日不設收貨日。"
          }
        }, {
          "@type"         : "Question",
          "name"          : "運送過程貨品是否保持低溫？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text" : "MyFridge 全程以冷凍保鮮「攝氏0-4℃」配送到府上。"
          }
        }, {
          "@type"         : "Question",
          "name"          : "現在下單最快幾時收貨？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text" : "下單時可於網站選擇收貨日，加一個工作天可安排派件，如需週末派件，只需加收$10服務費"
          }
        }, {
          "@type"         : "Question",
          "name"          : "如何聯絡運輸？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text" : "客人可先提前下載SF app，運輸(順豐)會於收件後發出SMS 及 於App 自動發出出貨通知，收貨日早上便能查看到派件司機電話"
          }
        }
      ]
    }
    </script>
  </v-container>
</template>

<script>
export default {
  name : "QNA",
  head () {
    return {
      title : this.$t('faq') + ' MyFridge',
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
