<template>
  <v-container>
    <v-row>
      <v-col class="height-1500">
        <h1>{{ $t('faq') }}</h1>
        <template v-if="$i18n.locale === 'zh'">
          <ol class="py-5">
            <li class="py-2">
              <div><b>需要運費嗎？</b></div>
              <div>最低訂購金額：$200 (+$60 運費)。大部份地區訂購滿 $300 可享免費送貨 (偏遠地方除外)。</div>
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
              <div>您可以在選購時選取送貨日子「由 三 日內送抵起」，請留意公眾假期不是我們的工作天，因此公眾假期後一日不設收貨日。</div>
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
              <div><b>退貨 / 退款 Retrun / Exchange Policy</b></div>
              <div>收貨人士收取貨品的同時，有責任檢查貨品，發票一經收貨人士簽名作實，便視為交易完成。</div>
              <div>如閣下在簽收貨品後有任何不滿，請於收貨當日致電 6565 7682 或電郵至 info@myfridgehk.com 與我們的職員聯繫。我們了解及評估 閣下的情況後，視乎不同情況向閣下作出適當回應，包括退款，更換貨品或提供現金券以供 閣下下次的購物時使用。如遇信用卡退款時需要留意，信用卡公司可能需要至少5個星期時間以處理有關退款程序。</div>
              <div>為了能讓我們作更準確的評估，我們懇請閣下：</div>

              <div>1) 妥善保存貨品於雪櫃急凍格內，直到我們安排職員把它取回。當閣下與我們聯繫後，我們會盡快回收貨品。</div>

              <div>2) 為有問題或缺陷的貨品拍照給我們能讓我們更了解閣下的情況。</div>

              <div>如有爭議，My Fridge 保留最終決定權。</div>

            </li>

            <li class="py-2">
              <div><b>收貨後如何保存？</b></div>
              <div>存放冰格-4℃ 至 -18℃保存。</div>
            </li>

            <li class="py-2">
              <div><b>現在下單最快幾時收貨？</b></div>
              <div>下單時可於網站選擇收貨日，加 兩 個工作天可安排派件。</div>
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
              <div>Minimum Order Amount: $200 (plus a $60 delivery fee). Orders above $300 come with free delivery (excluding remote areas).</div>
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
              <div>ou can select the delivery date "from within three days" when purchasing. Please note that public holidays are not our working days, so there is no delivery day on the day after a public holiday.</div>
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
              <div><b>Retrun / Exchange Policy</b></div>
              <div>When you receive your delivery, we encourage you to firstly check whether it is satisfactory and complete and if everything is fine. If you discover any dissatisfaction with your goods after you have signed for them, then please contact us on the same day of delivery (please either call us on 6565 7682 or email us at info@myfridgehk.com). After assessing the situation and dependent on whether the claim is reasonable to us, we may be able to reimburse you, replace the product or offer you cash back on your next purchase, whichever method is most appropriate. It should be noted however that for reimbursements, credit card companies may take up to 5 weeks to recognize the funds in your account.</div>
              <div>In case of any disputes, the decision of My Fridge shall be final.</div>

              <div>In order to assist us with assessing the situation, we would advise that you please:</div>

              <div>1) Keep the product until we arrange for it to be picked up. We will endeavor to have it picked up as soon as possible after you contact us.</div>

              <div>2) If applicable, take a photograph of the problem or defect with the product.</div>

            </li>

            <li class="py-2">
              <div><b>How to store the goods after receiving them? </b></div>
              <div>Store in low temperature (-4℃ to -18℃).</div>
            </li>

            <li class="py-2">
              <div><b>When is the fastest time to receive the goods if you place an order now? </b></div>
              <div>When placing an order, you can select the delivery date on the website, orders will be delivered in 3 working days.</div>
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
