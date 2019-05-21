import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        defaultOrigin: process.env.NODE_ENV === 'production' ? 'http://bill.static.buer.group/api/' : 'http://127.0.0.1:3000/',
        userList: [],
        typeList: [],
        recordList: [],
    },
    mutations: {
        changeUserList(state, payload){
            state.userList = payload
        },
        changeTypeList(state, payload) {
            state.typeList = payload
        },
        changeRecordList(state, payload) {
            state.recordList = payload
        }
    },
    actions: {
        /**
         * @desc 记录管理
         * */
        getRecordList({ commit, state }, payload) {
            let { limit = 0, page = 0 } = payload || {}
            axios.get('/api/record').then(res => {
                commit('changeRecordList', res.data)
            })
        },
        async createRecord({ commit, state, dispatch }, payload) {
            let result = await axios.post('/api/record/createRecord', payload)
            // dispatch('getRecordList') //更新记录列表
            return result
        },
        async removeRecord( context, { id } ) {
            await axios.post('/api/record/removeRecord', { "id": id });
        },
        async updateRecord( context, { data } ) {
            await axios.post('/api/record/updateRecord', data)
        },
        /**
         * @desc 用户管理
         * */
        getUserList({ commit, state }) {
            axios.get('/api/user').then(res => {
                commit('changeUserList', res.data)
            })
        },
        async createNewUser( { commit, state, dispatch }, { data }) {
            let res = await axios.post('/api/user/createUser', data)
            return res
        },
        async updateUserDetail({ commit, state, dispatch }, payload) {
            let result = await axios.post('/api/user/updateUser', payload)
            // dispatch('getUserList') //更新记录列表
            return result
        },
        /**
         * @desc 基础分类管理
         * */
        getTypeList({ commit, state }) {
            axios.get('/api/base').then(res => {
                commit('changeTypeList', res.data)
            })
        },
        async updateCategory( { commit, state, dispatch }, payload) {
            let data = await axios.post('/api/base/updateCategory', payload)
            commit('changeTypeList', data.data)
            return true;
        },
        async removeCategory({ commit, state, dispatch }, payload) {
            let data = await axios.post('/api/base/remove', {"id": payload.id })
            commit('changeTypeList', data.data)
            return true
        },
        /**
         * @desc 账单管理
         * */
    },
    getters: {
        getDefaultOrigin: state => {
            return state.defaultOrigin
        },
        getUserList: state => {
            return state.userList
        },
        getTypeList: state => {
            return state.typeList
        },
        getRecordList: state => {
            return state.recordList
        }
    }
})