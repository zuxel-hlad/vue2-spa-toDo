import VueRouter from 'vue-router'
import Home from "../pages/Home";
import ChangeTodo from '../pages/Change-todo'
import TodoItem from "../components/TodoItem";

const routes = [
    {
        path: '/home',
        alias: '/',
        component: Home,
    },
    {
        path: '/change/:todoId',
        component: ChangeTodo,
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0, behavior: 'smooth'}
    },
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

export default router
