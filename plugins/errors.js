export default function ({ app }) {
  app.nuxt.error = (error) => {
    // make nuxt default error handle to empty
    // to bypass nuxt default error redirection
    // console.log('page error: ', error)
  }
}
