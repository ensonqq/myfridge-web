<template>
  <v-container>
    <v-row>
      <v-col class="height-1500">
        <h1 class="py-2">{{ $t('aboutUs') }}</h1>
        <p class="py-2">
          <v-img :src="require('~/assets/images/team-resized.jpg')"></v-img>
        </p>
        <template v-if="$i18n.locale === 'zh'">
          <p class="py-2">
            myfridge (滿記凍肉有限公司) 公司成立於2015年，為香港本地優質凍肉品牌，
          </p>
          <p class="py2">
            擁有超過20000呎食品製造工場，嚴格管控食物製造過程，為所有客戶提供安全，健康，完美品質的食品。
          </p>
          <p class="py-2">
            提供一站式購物體驗，網上下單，最快2日後送到指定地址／自取點，方便快捷。
          </p>
        </template>
        <template v-else>
          <p class="py-2">
            myfridge (滿記凍肉有限公司) was established in 2015 and is Hong Kong’s premium frozen meat brand.
          </p>
          <p class="py2">
            With a food manufacturing plant of more than 20,000 square feet, we strictly control the food manufacturing process to provide all customers with safe, healthy, and perfect quality food.
          </p>
          <p class="py-2">
            Providing a one-stop shopping experience, place an order online and it will be delivered to the designated address/pickup point as soon as 2 days later, which is convenient and fast.
          </p>
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
