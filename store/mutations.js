import Cookies from 'js-cookie'
import _       from 'lodash'
import api     from "@/plugins/api";
import moment  from 'moment'

export default {
  // set user object
  // control login status
  setUser (state, payload) {
    state.user = payload
    //hide login modal
    state.loginModal = false
  },

  // set access & refresh token in cookies for accessing apis
  setTokens (state, payload) {
    // 14days for access-token, synced with api
    Cookies.set('access-token', payload.access.token, { expires : 14 })

    // 30 days for refresh-token, synced with api
    Cookies.set('refresh-token', payload.refresh.token, { expires : 30 })
  },

  // logout, clear tokens & remove user object in state
  logout (state) {
    state.loggedIn = false
    state.user = {}
    Cookies.remove('access-token')
    Cookies.remove('refresh-token')
    // window.scroll(0, 0)
  },

  // toggle login pop up modal globally
  toggleLoginModal (state, payload) {
    state.loginModal = payload
  },

  // toggle shopping cart drawer globally
  toggleShoppingCartDrawer (state, payload) {
    state.shoppingCartDrawer = payload
  },

  // toggle shopping cart drawer globally
  togglePrizeDrawer (state, payload) {
    state.prizeDrawer = payload
  },

  // toggle top up credit dialog globally
  toggleTopUpCreditsDialog (state, payload) {
    state.showTopUpCreditsDialog = payload
  },

  // toggle navigation drawer globally
  toggleNavDrawer (state, payload) {
    state.navDrawer = payload
  },

  // remove snack bar message
  spliceSnackbarMessages (state, payload) {
    state.snackbarMessages.splice(payload, 1)
  },

  // push snack bar message
  pushSnackbarMessages (state, payload) {
    state.snackbarMessages.push(payload)
    // if (typeof payload === 'string') {
    //   state.snackbarMessages.push(payload)
    // } else if (typeof payload === 'object') {
    //   let innerArrayIndex = _.findIndex(state.snackbarMessages, (item) => {
    //     return typeof item === 'object' && item.length > -1
    //   })
    //
    //   if (innerArrayIndex < 0) {
    //     innerArrayIndex = (state.snackbarMessages.push([])) - 1
    //   }
    //   state.snackbarMessages[innerArrayIndex].push(payload)
    // }
  },

  // set shopping cart items
  setCart (state, payload) {
    state.cart = payload
  },

  // set shopping cart prizes items
  setMyPrize (state, payload) {
    state.myPrize = payload
  },

  // enable trial
  enableTrial (state, payload) {
    state.showTrial = payload
  },

  // category discount object
  setCatDiscount (state, payload) {
    state.catDiscount = payload
  },

  // category discount object
  setBuyXGetYFree (state, payload) {
    state.buyXGetYFree = payload
  },

  // location data from server
  setLocations (state, payload) {
    state.locations = payload
  },

  // location data from server
  setHolidays (state, payload) {
    state.holidays = payload.map(item => moment(item).format('YYYY-MM-DD'))
  },

  // system time from server
  setSystemTime (state, payload) {
    state.systemTime = payload
  },

  // location data from server
  setCategories (state, payload) {
    state.categories = payload
  },

  // location data from server
  setTopupCredits (state, payload) {
    state.topupCredits = payload
  },

  // location data from server
  setPrize (state, payload) {
    state.prize = payload
  },

  // location data from server
  setGift (state, payload) {
    state.gift = payload
  },

  // alert
  setAlert (state, payload) {
    state.alert = payload
  },

  // latest order
  setLatestOrder (state, payload) {
    const orderNumber = payload.orderNumber
    const accessCode = payload.accessCode
    //TODO, cookies + state?
    state.latestOrder = { orderNumber, accessCode }
  }
}
