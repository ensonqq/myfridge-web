export default function ({ store, route, redirect }) {
  // disable nav drawer for route changes
  store.commit('toggleNavDrawer', false)
}
