import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        defaultOrigin: 'http://127.0.0.1:3000/',
        userList: [],
        typeList: [],
        billList: [],
    },
    mutations: {
      changeUserList(state, payload){
          state.userList = payload;
      },
      changeTypeList(state, payload) {
          state.typeList = payload;
      },
      changeBillList(state, payload) {
          state.billList = payload
      }
    },
    actions: {
        getUserList({ commit, state }) {
            axios.get('/api/user').then(res => {
                commit('changeUserList', res.data)
            })
        },
        getTypeList({ commit, state }) {
            axios.get('/api/base').then(res => {
                commit('changeTypeList', res.data)
            })
        },
        getBillList({ commit, state }, payload) {
            let { limit = 0, page = 0 } = payload || {}
            axios.get('/api/detail').then(res => {
                commit('changeBillList', res.data)
            })
        },
        async createBillDetail({ commit, state, dispatch }, payload) {
            let result = await axios.post('/api/detail/createDetil', payload)
            // dispatch('getBillList') //更新记录列表
            return result;
        },
        async updateUserDetail({ commit, state, dispatch }, payload) {
            let result = await axios.post('/api/user/updateUser', payload)
            // dispatch('getUserList') //更新记录列表
            return result;
        },
        async updateCategory( { commit, state, dispatch }, payload) {
            let data = await axios.post('/api/base/updateCategory', payload)
            commit('changeTypeList', data.data);
            return true;
        },
        async removeCategory({ commit, state, dispatch }, payload) {
            let data = await axios.post('/api/base/remove', {"id": payload.id })
            commit('changeTypeList', data.data);
            return true;
        },
        async createNewUser( { commit, state, dispatch }, { data }) {
            let res = await axios.post('/api/user/createUser', data);
            return res
        }
    },
    getters: {
        getDefaultOrigin: state => {
            return state.defaultOrigin
        },
        getUserList: state => {
            return state.userList;
        },
        getTypeList: state => {
            return state.typeList;
        },
        getBillList: state => {
            return state.billList
        }
    }
  })