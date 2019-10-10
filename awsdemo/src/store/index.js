import Vue from 'vue'
import Vuex from 'vuex'
import dao from './modules/DAO'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        dao
    }
})
