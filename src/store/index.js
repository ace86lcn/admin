import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'           // vuex持久化解决

Vue.use(Vuex)

const state = {
    tokenName: 'admin-auth-token',               //令牌名
    token: '',                                   //token
    companyName: '',                             //所属项目的公司名
}

const mutations = {
    changeToken(state, token) {
        state.token = token
    },
    changeCompanyName(state, companyName) {
        state.companyName = companyName
    }
}

export default new Vuex.Store({
    state,
    mutations,
    plugins: [
        new VuexPersistence({
            reducer: state => ({
                //这个就是存入localStorage的值
                token: state.token,
                companyName: state.companyName
            })
        }).plugin
    ]
})