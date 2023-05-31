import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    // 暂时配置路由默认跳转
    // {
    //   path: '/',
    //   redirect: '/share'　　//默认显示
    // },

    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/customer',
        name: 'customer',
        component: () => import(/* webpackChunkName: "about" */ '../views/CustomerView.vue')
    },
    {
        path: '/share',
        name: 'share',
        component: () => import(/* webpackChunkName: "about" */ '../views/ShareView.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
