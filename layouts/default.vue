<template>
  <v-app>
    <Header/>
    <Nuxt class="content"/>
<!--    <GoToBtn/>-->
    <TopUpCreditsDialog></TopUpCreditsDialog>
    <ShoppingCart></ShoppingCart>
    <NavbarList></NavbarList>
    <SignIn></SignIn>
    <Snack></Snack>
    <Spinner></Spinner>
    <Footer></Footer>
  </v-app>
</template>
<style scoped>
.content {
  margin-top: 64px;
}
</style>


