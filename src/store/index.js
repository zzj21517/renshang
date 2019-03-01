import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import app from './modules/app'
import vuexAlong from 'vuex-along'
import permission from './modules/permission'
Vue.use(Vuex)


const store=new Vuex.Store({
    modules:{
        user,
        app,
        permission
    },
    getters,
    plugins:[vuexAlong]
})

export default store