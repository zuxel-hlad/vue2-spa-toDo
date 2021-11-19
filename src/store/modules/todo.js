import router from '../../router';
// initial state items
const todos = [
    {
        title: 'By cat',
        list: ['example-1', 'example-2', 'example-3'],
        id: 1,
        isDone: false
    },
    {
        title: 'By car',
        list: ['example-4', 'example-5', 'example-6'],
        id: 2,
        isDone: false
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
        deleteTodo(state, payload) {
            const deletedTodo = state.todos.findIndex(item => item.id === payload)
            state.todos.splice(deletedTodo, 1)
            localStorage.removeItem('todoItems')
            localStorage.setItem('todoItems', JSON.stringify(state.todos))
        },
        createTodo(state, payload) {
            state.todos.push({
                title: payload,
                id: state.todos[state.todos.length - 1].id + 1
            })
            localStorage.removeItem('todoItems')
            localStorage.setItem('todoItems', JSON.stringify(state.todos))
            router.push('/home')
        }
    },
}
