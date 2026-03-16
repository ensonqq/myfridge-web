import axios             from 'axios'
import Cookies           from 'js-cookie'
import {mdiAlertOutline} from "@mdi/js";

export default ({ app, store }, inject) => {
  // initial base url by host name
  const hostname = window.location.hostname
  // const localApiRoot = 'https://api.myfridgehk.com'
  const localApiRoot = 'http://localhost:3001'
  // const localApiRoot = 'https://dev.myfridgehk.com/api'
  const devApiRoot = 'https://api-dev.myfridgehk.com'
  const prodApiRoot = 'https://api.myfridgehk.com'

  const baseURL = hostname === 'student.myfridgehk.com' || hostname === 'myfridgehk.com' ? prodApiRoot
    : hostname === 'dev.myfridgehk.com' ? devApiRoot : localApiRoot

  // api instance with interceptors
  const api = axios.create({
    baseURL,
  })

  // clean instance for refresh tokens
  const cleanApiInstance = axios.create({ baseURL })

  api.interceptors.request.use(
    async config => {
      // document.body.classList.add('loading')
      config.headers = {
        'Authorization' : `Bearer ${ Cookies.get('access-token') }`,
        'Content-Type'  : 'application/json',
        'fbc'           : Cookies.get('_fbc'),
        'fbp'           : Cookies.get('_fbp'),
      }

      if (config.data) {
        delete config.data.createdAt
        delete config.data.updatedAt
      }

      return config;
    }, error => {
      // document.body.classList.remove('loading')
      setTimeout(() => {
        store.commit('pushSnackbarMessages', '網絡連線錯誤，請重新嘗試。')
      }, 1000)

      return Promise.reject(error)
    })

  api.interceptors.response.use(response => {
    // document.body.classList.remove('loading')
    return response
  }, error => {
    // document.body.classList.remove('loading')
    const { response, config } = error
    if (response.status !== 401 || config.url.indexOf('/auth/login') > -1) {
      // store.commit('pushSnackbarMessages', )
      // setTimeout(() => {
      //   store.commit('pushSnackbarMessages', '網絡連線錯誤，請重新嘗試。')
      // }, 1000)
      return Promise.reject(error)
    }

    // Use a 'clean' instance of axios without the interceptor to refresh the token. No more infinite refresh loop.
    return cleanApiInstance.post('/v1/auth/refresh-tokens', { refreshToken : `${ Cookies.get('refresh-token') }` })
                           .then((response) => {
                             // If you are using localStorage, update the token and Authorization header here
                             if (!response.data) throw new Error("Connection Error");
                             // console.log(response)
                             store.commit('setTokens', response.data)
                             return api(config)
                           })
                           .catch((error) => {
                             store.commit('pushSnackbarMessages', '請重新登入。')
                             store.commit('logout')
                             return Promise.reject(error)
                           })
  })

  api.updateCart = async function (items) {
    try {
      if (Cookies.get('access-token')) {
        //member cart
        const updatedCart = await api.post('/v1/cart', { items })
        if (updatedCart.data && updatedCart.data.items && updatedCart.data.items) {
          store.commit('setCart', updatedCart.data.items)
        }
      } else {
        //non-member cart
        Cookies.set('cart', JSON.stringify(items))
        const updatedCart = await api.post('/v1/products/mapCartItems', { items })
        if (updatedCart.data && updatedCart.data.items) {
          store.commit('setCart', updatedCart.data.items)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  api.myProfile = async function () {
    try {
      if (!Cookies.get('access-token')) return

      const profile = await api.get('/v1/auth/me')
      if (profile.data) {
        store.commit('setUser', profile.data)
      }
      return true
    } catch (e) {
      console.log(e)
    }
  }

  api.getAlert = async function () {
    try {
      //
      const alertType = hostname === 'student.myfridgehk.com' ? 'studentAlert' : 'alert'
      const result = await api.get('/v1/settings/' + alertType)
      if (result.data && result.data.value) {
        store.commit('setAlert', result.data.value.alert)
      }
      return true
    } catch (e) {
      console.log(e)
    }
  }

  api.myCart = async function () {
    try {
      if (Cookies.get('access-token')) {
        // console.log('into members')
        //member
        const myCart = await api.get('/v1/cart')
        if (myCart.data && myCart.data.items && myCart.data.items.length) {
          // console.log('members got cart items, setting cart items', myCart.data.items)
          store.commit('setCart', myCart.data.items)
        } else {
          //if member has empty cart but added cookies before
          // console.log('members got empty cart items, setting cart items from cookies')
          await api.setCartFromCookies()
        }
      } else {
        //non-member
        // console.log('into non member cart')
        await api.setCartFromCookies()
      }


      return true
    } catch (e) {
      console.log(e)
    }
  }

  api.getMyPrize = async function () {
    try {
      if (Cookies.get('access-token')) {
        // console.log('into members')
        //member
        const myPrize = await api.get('/v1/prizes/myPrize')
        if (myPrize.data && myPrize.data.id) {
          // console.log('members got cart items, setting cart items', myCart.data.items)
          store.commit('setMyPrize', myPrize.data)
        } else {
          store.commit('setMyPrize', null)
        }
      } else {
        store.commit('setMyPrize', null)
      }
      return true
    } catch (e) {
      console.log(e)
    }
  }

  api.setCartFromCookies = async function () {
    try {
      //member
      const cartInCookies = Cookies.get('cart')
      if (cartInCookies) {
        const cookies = JSON.parse(cartInCookies)
        // console.log('cart from cookies', cookies)
        if (cookies) {
          // console.log('cart from cookies', cookies)
          await api.updateCart(cookies)
          if (Cookies.get('access-token')) {
            //remove cookies cart
            Cookies.remove('cart')
          }
        }
      }
      return true
    } catch (e) {
      console.log(e)
    }
  }

  inject('api', api)
}
