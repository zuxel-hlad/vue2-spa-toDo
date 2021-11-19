import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

export default {
    namespaced: true,
    state() {
        return {
            todos: [
                {
                    title: 'By cat',
                    list: ['example-1', 'example-2', 'example-3'],
                    id: Math.random(),
                    isDone: false
                },
                {
                    title: 'By car',
                    list: ['example-4', 'example-5', 'example-6'],
                    id: Math.random(),
                    isDone: false
                }
            ]

        }
    },
    //return array of todos
    getters: {
        allTodos(state) {
            return state.todos
        }
    },
    //delete current todo
    mutations: {
        deleteTodo(state, payload) {
            const deletedTodo = state.todos.findIndex(item => item.id === payload)
            state.todos.splice(deletedTodo, 1)
            console.log(state.todos)
        }
    },
}
