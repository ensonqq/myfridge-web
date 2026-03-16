<template>
  <v-app>
    <div class="hero-section">
      <Header :class="toggleNavClass()"/>
      <div id="navbar-hero">
        <v-container>
          <div class="d-flex align-center mt-6 mb-10  navbar-container">
            <nuxt-link to="/">
              <v-avatar tile width="120" height="120">
                <img class="weblogo" src="~/assets/images/logo.png" alt=""/>
              </v-avatar>
            </nuxt-link>
            <v-spacer></v-spacer>
            <AccountButton :dark="true"></AccountButton>

            <!-- shopping cart button -->
            <CartButton dark text tile></CartButton>

            <!-- navigation burger button -->
            <v-btn icon @click="toggleNavDrawer(true)" dark>
              <v-icon large>{{ icons.mdiMenu }}</v-icon>
            </v-btn>
            <!--            <v-app-bar-nav-icon dark text class="rounder" @click="toggleNavDrawer(true)"></v-app-bar-nav-icon>-->
          </div>
        </v-container>
      </div>
    </div>
    <Nuxt class="content" :class="toggleNavClass()"/>
    <!--    <GoToBtn/>-->
    <TopUpCreditsDialog></TopUpCreditsDialog>
    <ShoppingCart></ShoppingCart>
    <NavbarList></NavbarList>
    <SignIn></SignIn>
    <Snack></Snack>
    <Spinner></Spinner>
  </v-app>
</template>
<script>
import {mapMutations, mapState}  from "vuex";
import {mdiCartOutline, mdiMenu} from '@mdi/js'

export default {
  computed : {
    ...mapState(['loginModal', 'user']),
  },
  data     : () => ({
    icons  : {
      mdiCartOutline, mdiMenu
    },
    drawer : false,
    active : false,
    dialog : false,
  }),
  methods  : {
    ...mapMutations(['toggleNavDrawer']),
    toggleNavClass () {
      if (this.active == false) {
        return 'nav'
      } else {
        return 'sticky-nav'
      }
    }
  },
  mounted () {
    window.document.onscroll = (event) => {
      if (window.scrollY > 200) {
        this.active = true;
      } else {
        this.active = false;
      }
    }
  }
}
</script>
