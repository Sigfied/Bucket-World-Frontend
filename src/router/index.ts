import {createRouter, createWebHashHistory} from 'vue-router'
// @ts-ignore
import HomeView from '../views/HomeView.vue'


const routes = [
    // 暂时配置路由默认跳转
    // {
    //   path: '/',
    //   redirect: '/share'　　//默认显示
    // },
    {
        path: "/",
        name: "test",
        // @ts-ignore
        component: () => import("../components/TestUpload.vue")
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // @ts-ignore
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/customer',
        name: 'customer',
        // @ts-ignore
        component: () => import(/* webpackChunkName: "about" */ '../views/CustomerView.vue')
    },
    {
        path: '/share',
        name: 'share',
        // @ts-ignore
        component: () => import(/* webpackChunkName: "about" */ '../views/ShareView.vue')
    }, {
        path: "/file",
        name: "file",
        // @ts-ignore
        component: () => import("../components/FileList.vue")
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
