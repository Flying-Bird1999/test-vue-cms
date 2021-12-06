import Vue from 'vue'
import Vuex from 'vuex'
import {getInfo} from '../../api/http'

Vue.use(Vuex)

const state = {
    roles: []  //角色
}

const getters = {
    roles: state => state.roles
}

const actions = {
    getInfo({commit}) {
        return new Promise((resolve, reject) => {
            getInfo().then(res => {
                if (res.data.code === 200){
                    commit('SETROLES', res.data.data)
                }
                resolve(res.data.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    logout({commit}) {
        commit('SETROLES', [])
    }
}

const mutations = {
    SETROLES: (state, d) => {
        state.roles = d
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}