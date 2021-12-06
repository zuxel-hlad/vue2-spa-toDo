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

//set items to localStorage mok data for develop.
// localStorage.setItem('todoItems', JSON.stringify(todos))

// set initialState
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
            todos: setInitialState(),
            backupCancelChange: null
        }
    },

    mutations: {
        setStateHandler(state) {
            localStorage.removeItem('todoItems')
            localStorage.setItem('todoItems', JSON.stringify(state.todos))
        },
        backupCancelChanges(state, idx) {
            state.backupCancelChange = {...state.todos[idx]};
            localStorage.removeItem('todoBackup')
            localStorage.setItem('todoBackup', JSON.stringify(state.backupCancelChange))
        },
        deleteTodo(state, payload) {
            const deletedTodo = state.todos.findIndex(item => item.id === payload)
            store.commit('todosModule/backupCancelChanges', deletedTodo)
            state.todos.splice(deletedTodo, 1)
            store.commit('todosModule/setStateHandler')
        },
        createTodo(state, payload) {
            state.todos.push({
                title: payload,
                id: new Date().getTime(),
                list: [],
            })
            store.commit('todosModule/setStateHandler')
        },
        markTodoTask(state, payload) {
            const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
            const currenMessage = state.todos[currentTodoIdx].list.find(item => item.id === payload.messageId)
            currenMessage.isDone = !currenMessage.isDone
            store.commit('todosModule/backupCancelChanges', currentTodoIdx)
        },
        changeTodoTaskMessage(state, payload) {
            const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
            const currenMessage = state.todos[currentTodoIdx].list.find(item => item.id === payload.messageId)
            currenMessage.message = payload.newMessage
            store.commit('todosModule/backupCancelChanges', currentTodoIdx)
        },
        addTodoTask(state, payload) {
            const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
            state.todos[currentTodoIdx].list.push({
                message: payload.message,
                isDone: false,
                id: new Date().getTime(),
            })
            store.commit('todosModule/backupCancelChanges', currentTodoIdx)
        },
        removeTodoTask(state, payload) {
            const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
            const currentTodoTaskIdx = state.todos[currentTodoIdx].list.findIndex(item => item.id === payload.taskId)
            store.commit('todosModule/backupCancelChanges', currentTodoIdx)
            state.todos[currentTodoIdx].list.splice(currentTodoTaskIdx, 1)
        },
        cancelTodoChanging(state) {
            state.todos = setInitialState()
        },
        saveTodoChanges(state) {
            store.commit('todosModule/setStateHandler')
        },
        cancelLastChange(state) {
            state.todos = setInitialState()
        },
        repeatLastChanges(state) {
            const lastItem = JSON.parse(localStorage.getItem('todoBackup'))
            let currentTodo = state.todos.find(item => item.id === lastItem.id)
            for (let key in currentTodo) {
                currentTodo[key] = lastItem[key]
            }
        }
    },
}
