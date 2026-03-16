<template>
  <span class="spiciness red--text text-14" v-if="value">
    (辣度：<template v-for="i in value">🌶️</template>)
  </span>
</template>

<script>
export default {
  name  : "SpicyRating",
  props : ['value']
}
</script>
<style scoped lang="scss">
.spiciness {
  color: red;
}
</style>
