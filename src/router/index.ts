import {createRouter, createWebHashHistory} from 'vue-router'

// @ts-ignore
const routes = [
    // 暂时配置路由默认跳转
    // {
    //   path: '/',
    //   redirect: '/share'　　//默认显示
    // },
    {
        path: "/",
        name: "login",
        // @ts-ignore
        component: () => import("../views/LoginView.vue")
    },
    {
        path: "/test",
        name: "test",
        // @ts-ignore
        component: () => import("../components/TestUpload.vue")
    },
    {
        path: '/home',
        name: 'home',
        // @ts-ignore
        component: () => import("../views/HomeView.vue")
    },

    {
        path: '/perview',
        name: 'perview',
        // @ts-ignore
        component:  () => import(/* webpackChunkName: "about" */ '../components/PerViewPage.vue')
    },
    {
        path: '/about',
        name: 'about',
        // @ts-ignore
        component: () => import( '../views/AboutView.vue')
    },
    {
        path: '/customer',
        name: 'customer',
        // @ts-ignore
        component: () => import( '../views/CustomerView.vue')
    },
    {
        path: '/share/:id',
        name: 'share',
        // @ts-ignore
        component: () => import( '../views/ShareView.vue')
    },
    {
        path: "/file",
        name: "file",
        // @ts-ignore
        component: () => import("../views/FileList.vue")
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
