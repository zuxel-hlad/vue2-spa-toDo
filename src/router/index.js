import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../pages/Home";
import ChangeTodo from '../pages/Change-todo'
import TodoItem from "../components/TodoItem";
import TodoCreate from "../components/TodoCreater";

Vue.use(VueRouter)

const routes = [
    {
        path: '/home/',
        alias: '/',
        component: Home,
    },
    {
        path: '/create',
        component: TodoCreate,
    },
    {
        path: '/change',
        component: ChangeTodo,
        children: [
            {
                path: ':todoId',
                component: TodoItem,
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0,behavior: 'smooth' }
    },
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

export default router
