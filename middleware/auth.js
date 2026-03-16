export default function ({ store, redirect }) {
  if (!store.state.user) {
    store.commit('toggleLoginModal', true)
  }
}
