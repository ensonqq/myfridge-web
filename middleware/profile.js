import Cookies from 'js-cookie'

export default async function ({ route, app, store, $auth }) {
  try {
    if (!store.state.cart.length) {
      try {
        await app.$api.myCart()
      } catch (e) {
        console.log(e)
      }
    }

    if (Cookies.get('access-token') && !store.state.user.id) {
      try {
        await app.$api.myProfile()
        await app.$api.getMyPrize()
      } catch (e) {
        console.log(e)
      }
    }

    if (!store.state.locations) {
      try {
        const locations = await app.$api.get('/v1/settings/locations')
        store.commit('setLocations', locations.data)
      } catch (e) {
        console.log(e)
      }
    }

    // if (!store.state.holidays) {
    //   try {
    //     const holidays = await app.$api.get('/v1/settings/holidays')
    //     store.commit('setHolidays', holidays.data)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

    // if (!store.state.systemTime) {
    //   try {
    //     const now = await app.$api.get('/v1/settings/systemTime')
    //     if (now && now.data) {
    //       store.commit('setSystemTime', now.data.now)
    //     }
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }

    if (!store.state.categories.length) {
      try {
        const categories = await app.$api.get('/v1/categories/')
        store.commit('setCategories', categories.data.results)
      } catch (e) {
        console.log(e)
      }
    }

    if (!store.state.topupCredits.length) {
      try {
        const topupCards = await app.$api.get('/v1/topups/getPublishedTopups', { params : { sortBy : 'price' } })
        store.commit('setTopupCredits', topupCards.data.results)
      } catch (e) {
        console.log(e)
      }
    }

    if (!store.state.prize) {
      try {
        const prizes = await app.$api.get('/v1/prizes/getPublishedPrizes', { params : { sortBy : '-createdAt' } })
        if (prizes.data && prizes.data.results && prizes.data.results.length) {
          store.commit('setPrize', prizes.data.results[0])
        }
      } catch (e) {
        console.log(e)
      }
    }

    if (!store.state.gift) {
      try {
        const gifts = await app.$api.get('/v1/gifts/getPublishedGifts', { params : { sortBy : '-createdAt' } })
        if (gifts.data && gifts.data.results && gifts.data.results.length) {
          store.commit('setGift', gifts.data.results[0])
        }
      } catch (e) {
        console.log(e)
      }
    }


    if (!store.state.alert) {
      try {
        await app.$api.getAlert()
      } catch (e) {
        console.log(e)
      }
    }

  } catch (e) {
    console.log('routing middle error: ', e)
  }
}
