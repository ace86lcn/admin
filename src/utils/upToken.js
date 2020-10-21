import VueCookies from 'vue-cookies'

const upToken = {}

if (VueCookies.get('cs_admin_token')) {
  upToken['operate-auth-token'] = VueCookies.get('cs_admin_token')
}

export default upToken
// import store from '../store'

// const upToken = {}

// if (store.state.token) {
//   upToken[store.state.tokenName] = store.state.token
// }

// export default upToken