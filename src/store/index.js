import Vuex from 'vuex'
import todosModule from './modules/todo-module/todo'
import Vue from "vue";

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        todosModule,
    }
})
