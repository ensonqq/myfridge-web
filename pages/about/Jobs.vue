<template>
  <v-container>
    <v-row>
      <v-col class="height-1500">
        <h1>{{ $t('vacancies') }}</h1>
        <template v-if="$i18n.locale === 'zh'">
          <p class="py-16">
            - 目前沒有空缺。
          </p>
          <p class="text-14">
            加入myfridge團隊，We want you！
          </p>
        </template>
        <template v-else>
          <p class="py-16">
            - There are currently no vacancies.
          </p>
          <p class="text-14">
            Join the myfridge team, We want you!
          </p>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name : "Jobs",
  head () {
    return {
      title : this.$t('vacancies') + ' myfridge',
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
