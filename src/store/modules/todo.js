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

const setInitialState = () => {
    let initialState;
    if (JSON.parse(localStorage.getItem('todoItems')) === null) {
        initialState = []
    } else {
        initialState = JSON.parse(localStorage.getItem('todoItems'))
    }

    return initialState
}

export default {
    namespaced: true,
    state() {
        return {
            todos: setInitialState()
        }
    },
    //return array of todos
    getters: {
        allTodos(state) {
            return state.todos
        }
    },

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
                id: new Date().getTime(),
                list: []
            })
            store.commit('todos/setStateHandler')
        },
        markTodoTask(state, payload) {
            const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
            const currenMessage = state.todos[currentTodoIdx].list.find(item => item.id === payload.messageId)
            currenMessage.isDone = !currenMessage.isDone
        },
        changeTodoTaskMessage(state, payload) {
            console.log(payload)
            const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
            const currenMessage = state.todos[currentTodoIdx].list.find(item => item.id === payload.messageId)
            currenMessage.message = payload.newMessage
        },
        addTodoTask(state, payload) {
            const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
            state.todos[currentTodoIdx].list.push({
                message: payload.message,
                isDone: false,
                id: new Date().getTime(),
            })
        },
        removeTodoTask(state, payload) {
            const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
            const currentTodoTaskIdx = state.todos[currentTodoIdx].list.findIndex(item => item.id === payload.taskId)
            state.todos[currentTodoIdx].list.splice(currentTodoTaskIdx, 1)
        },
        cancelTodoChanging(state) {
            state.todos = setInitialState()
        },
        saveTodoChanges(state) {
            store.commit('todos/setStateHandler')
        }
    },
}
