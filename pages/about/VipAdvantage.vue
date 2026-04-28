<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="pt-3">{{ $t('memberJetso') }}</h1>
        <template v-if="$i18n.locale === 'zh'">
          <h3>多種禮遇，盡在掌握</h3>
          <p>我們的會員升級計劃讓您更輕鬆在消費時累積更多以及盡享各種獎賞，以下詳情了解更多有關我們為尊貴會員所作出的革新。</p>
          <ol>
<!--            <li class="py-3">
              <h4>
                <v-icon>{{ icons.mdiWhatsapp }}</v-icon>
                會員 Whats App Channel
              </h4>
              <ul>
                <li class="my-2">我們會定期在Channel內免費派積分，下單時每1積分當1蚊使用。</li>
                <li class="my-2">頻道只會定期送積分及發佈優惠。</li>
                <li class="my-2">加入Channel 快人1步拎著數啊！</li>
                <li class="my-2" style="list-style: none;">
                  <a href="https://whatsapp.com/channel/0029VaRT7FuKrWQvxiqtiQ3R" target="_blank" rel="noopener">
                    <v-btn color="secondary" depressed>
                      <v-icon>{{ icons.mdiWhatsapp }}</v-icon>
                      快啲按此加入
                    </v-btn>
                  </a></li>
              </ul>
            </li>-->
            <li class="py-3">
              <h4>會員積分</h4>
              <ul>
                <li class="my-2">當您購買任何我們的產品，即可累積會籍積分。您累積的積分越多，您獲享的會籍級別間禮遇亦會越豐富，與晉升會籍級別的距離更會越接近。</li>
                <li class="my-2">會員每次落單成功，可獲得積分，每1積分當1蚊使用，下張訂單可以使用。</li>
                <li class="my-2">成為新會員即送會員積分{{ credits }}, 每1積分當1蚊使用。</li>
              </ul>
            </li>
            <li class="py-3">
              <h4>享有會員定期優惠（如適用）。</h4>
              <ul>
                <li class="my-2">減價活動：會員專享的減價活動。</li>
                <li class="my-2">倍數積分活動：會員獲得倍數積分。</li>
                <li class="my-2">會員專享產品：會員才可以購買的產品。</li>
              </ul>
            </li>
            <!--          <li class="py-3">可推薦朋友加入會員，朋友完成首次消費後，可獲得積分獎賞。</li>-->
            <li class="py-3">
              會員每次落單成功 (包括積分增值)，可獲得成長值
              <ul>
                <li>消費滿$3000即自動成為
                  <v-icon class="amber--text text--accent-4 mb-1">{{ icons.mdiCrown }}</v-icon>
                  <b>黃金級會員：</b>
                  <ul>
                    <li class="my-2">所有貨品享有<b>永久減$1優惠</b>，可與其他優惠同時使用，例如多買多減／優惠碼折扣等。
                    </li>
                  </ul>
                </li>
                <li>消費滿$6000即自動成為
                  <v-icon class="deep-purple--text text--lighten-1 mb-1">{{ icons.mdiDiamondStone }}</v-icon>
                  <b>鑽石級會員：</b>
                  <ul>
                    <li class="my-2">
                      享有黃金會員待遇。
                    </li>
                    <li class="my-2">
                      每次下單獲得3倍積分，相當於額外97折。
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li class="my-2">享有黃金會員專<b>享優惠或產品</b>（如適用）。</li>
            <li class="my-2">下單後能獲取<b>更多積分</b>（如適用）。</li>
          </ol>
          <h3>立即成為MyFridge會員</h3>
          <p class="py-3">
            我們將把您的會籍提升至更高層次，讓您享受前所未有的更豐富禮遇。盡情享受健康飲食及購物的美好，同時獲享各種豐富的獎賞──我們時刻與您同行。
          </p>
          <div class="d-flex justify-center align-center pb-8" v-if="!user.id">
            <v-btn class="my-3" x-large color="secondary" @click="toggleLoginModal(true)">立即登入／申請成為會員</v-btn>
          </div>
        </template>
        <template v-else><h3>A variety of benefits at your fingertips</h3>
          <p>Our membership upgrade program makes it easier for you to accumulate more when you spend and enjoy various rewards. Learn more about the innovations we have made for our valued members in the following details. </p>
          <ol>
            <li class="py-3">
              <h4>
                <v-icon>{{ icons.mdiWhatsapp }}</v-icon>
                Member Whats App Channel
              </h4>
              <ul>
                <li class="my-2">We will regularly distribute free credits in the Channel, and every 1 credit = $1 when placing an order.</li>
                <li class="my-2">The channel will only give out credits and publish promotions regularly.</li>
                <li class="my-2">Join Channel and count in one step!</li>
                <li class="my-2" style="list-style: none;">
                  <a href="https://whatsapp.com/channel/0029VaRT7FuKrWQvxiqtiQ3R" target="_blank" rel="noopener">
                    <v-btn color="secondary" depressed>
                      <v-icon>{{ icons.mdiWhatsapp }}</v-icon>
                      Hurry up and click here to join
                    </v-btn>
                  </a></li>
              </ul>
            </li>
            <li class="py-3">
              <h4>Member Points</h4>
              <ul>
                <li class="my-2">When you purchase any of our products, you can accumulate membership credits. The more credits you accumulate, the richer the benefits you will receive between membership levels, and the closer you will be to upgrading your membership level.</li>
                <li class="my-2">Members can earn credits every time they successfully place an order. Every 1 credit = $1, which can be used for the next order.</li>
                <li class="my-2">Becoming a new member will give you membership credits{{ credits }}, and every 1 credit = $1.</li>
              </ul>
            </li>
            <li class="py-3">
              <h4>Enjoy regular member discounts (if applicable). </h4>
              <ul>
                <li class="my-2">Discount activity: member-only discount activity.</li>
                <li class="my-2">Multiple credits activity: Members receive multiple credits.</li>
                <li class="my-2">Member-only products: products that only members can purchase.</li>
              </ul>
            </li>
            <!-- <li class="py-3">You can recommend friends to become members. After your friends complete their first purchase, they can receive credits as rewards. </li>-->
            <li class="py-3">
              Each time a member successfully places an order (including credit top up), he or she will receive growth values.
              <ul>
                <li>You will automatically become a golden member after spending $3000 or more.
                  <v-icon class="amber--text text--accent-4 mb-1">{{ icons.mdiCrown }}</v-icon>
                  <b>Golden membership:</b>
                  <ul>
                    <li class="my-2">All products enjoy a
                      <b>permanent $1 discount</b>, which can be used in conjunction with other offers, such as buy more get more, discounts/coupon code, etc.
                    </li>
                  </ul>
                </li>
                <li>You will automatically become a diamond member after spending over $5,000
                  <v-icon class="deep-purple--text text--lighten-1 mb-1">{{ icons.mdiDiamondStone }}</v-icon>
                  <b>Diamond membership:</b>
                  <ul>
                    <li class="my-2">
                      Enjoy golden membership benefits.
                    </li>
                    <li class="my-2">
                      Earn 3x credits every time you place an order, which is equivalent to an additional 93% off.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li class="my-2">Enjoy exclusive <b>benefits or products</b> for Gold members (if applicable).</li>
            <li class="my-2">Earn <b>more credits</b> after placing an order (if applicable).</li>
          </ol>
          <h3>Become an MyFridge member now</h3>
          <p class="py-3">
            We will upgrade your membership to a higher level, allowing you to enjoy richer benefits than ever before. Enjoy healthy eating and shopping while enjoying a variety of rich rewards - we are always with you.
          </p>
          <div class="d-flex justify-center align-center pb-8" v-if="!user.id">
            <v-btn class="my-3" x-large color="secondary" @click="toggleLoginModal(true)">Log in/apply to become a member now</v-btn>
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mdiCrown, mdiDiamondStone, mdiWhatsapp} from "@mdi/js";
import {mapMutations, mapState}                 from "vuex";

export default {
  name : "VipAdvantage",
  head () {
    return {
      title : this.$t('memberJetso') + ' MyFridge',
    }
  },
  created () {
    this.registerCredits()
  },
  computed : {
    ...mapState(['user'])
  },
  methods  : {
    ...mapMutations(['toggleLoginModal']),
    async registerCredits () {
      try {
        const req = await this.$api.get('/v1/settings/registerCredits')
        if (req && req.data) {
          this.credits = req.data.value
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  data     : () => ({
    credits : null,
    icons   : {
      mdiCrown,
      mdiWhatsapp,
      mdiDiamondStone
    }
  }),
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
