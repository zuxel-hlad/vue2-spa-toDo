import router from '../../router';
import store from '../index';

// initial state items example
const todos = [
    {
        title: 'By cat',
        list: [
            {
                message: 'example-1',
                isDone: false,
                id: 1
            }, {
                message: 'example-2',
                isDone: false,
                id: 2
            }, {
                message: 'example-3',
                isDone: false,
                id: 3
            },
        ],
        id: 1,
    },
    {
        title: 'By car',
        list: [
            {
                message: 'example-3',
                isDone: false,
                id: 1
            }, {
                message: 'example-4',
                isDone: false,
                id: 2
            }, {
                message: 'example-5',
                isDone: false,
                id: 3
            },
        ],
        id: 2,
    }
]
//set items to localStorage
// localStorage.setItem('todoItems', JSON.stringify(todos))
const initialState = JSON.parse(localStorage.getItem('todoItems'))

export default {
    namespaced: true,
    state() {
        return {
            todos: initialState
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
        setStateHandler(state) {
            localStorage.removeItem('todoItems')
            localStorage.setItem('todoItems', JSON.stringify(state.todos))
        },
        deleteTodo(state, payload) {
            const deletedTodo = state.todos.findIndex(item => item.id === payload)
            state.todos.splice(deletedTodo, 1)
            store.commit('todos/setStateHandler')
        },
        createTodo(state, payload) {
            state.todos.push({
                title: payload,
                id: state.todos[state.todos.length - 1].id + 1
            })
            store.commit('todos/setStateHandler')
            router.push('/home')
        },
        markTodo(state, payload) {
            const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
            const currenMessage = state.todos[currentTodoIdx].list.find(item => item.id === payload.messageId)
            currenMessage.isDone = !currenMessage.isDone
            store.commit('todos/setStateHandler')
        }
    },
}
