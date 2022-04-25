import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from "vue-router";
import router from './router/'
import components from './components/UI/index'
import './assets/theme.css'


Vue.use(VueRouter)

Vue.config.productionTip = false
components.forEach(component => {
    Vue.component(component.name, component)
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')