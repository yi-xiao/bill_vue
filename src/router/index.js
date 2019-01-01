import Vue from 'vue'
import VueRouter from 'vue-router'

import Userlist from '../components/users/Userlist'
import UserCreate from '../components/users/UserCreate'
import UserUpdate from '../components/users/UserUpdate'
import CategoryList from '../components/CategoryList'
import CategoryUpdate from '../components/CategoryUpdate'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/user/list'
        },
        {
            path: '/user/list',
            name: 'userList',
            component: Userlist,
        },
        {
            path: '/user/create',
            name: 'userCreate',
            component: UserCreate
        },
        {
            path: '/user/update',
            name: 'userUpdate',
            component: UserUpdate
        },
        {
            path: '/category/list',
            name: 'categoryList',
            component: CategoryList
        },
        {
            path: '/category/update',
            name: 'categoryUpdate',
            component: CategoryUpdate
        },
    ]
})

export default router;