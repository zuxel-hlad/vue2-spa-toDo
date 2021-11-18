import {createRouter, createWebHistory} from 'vue-router';
import Home from '../pages/Home';
import ChangeTodo from '../pages/Change-todo';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            alias: '/',
            component: Home
        },
        {
            path: '/change',
            component: ChangeTodo
        }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})


export default router
