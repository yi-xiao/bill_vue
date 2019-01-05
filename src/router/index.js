import Vue from 'vue'
import VueRouter from 'vue-router'

import Userlist from '../components/users/Userlist'
import UserCreate from '../components/users/UserCreate'
import UserUpdate from '../components/users/UserUpdate'
import CategoryList from '../components/category/CategoryList'
import CategoryCreate from '../components/category/CategoryCreate'
import RecordList from '../components/record/RecordList'
import RecordCreate from '../components/record/RecordCreate'
import RecordUpdate from '../components/record/RecordUpdate'
import StatisticList from '../components/statistic/StatisticList'
import StatisticPerson from '../components/statistic/StatisticPerson'

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
            path: '/category/create',
            name: 'categoryCreate',
            component: CategoryCreate
        },
        {
            path: '/record/list',
            name: 'recordList',
            component: RecordList
        },
        {
            path: '/record/create',
            name: 'recordCreate',
            component: RecordCreate
        },
        {
            path: '/record/update',
            name: 'recordUpdate',
            component: RecordUpdate
        },
        {
            path: '/statistic/list',
            name: 'statisticList',
            component: StatisticList
        },
        {
            path: '/statistic/person',
            name: 'statisticPerson',
            component: StatisticPerson
        },
    ]
})

export default router;