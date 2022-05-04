import localStorageService from "@/tools/localStorageService";

const {saveItems, getSavedItems} = localStorageService();

export default {

    getTodosFromDB(state) {
        state.todos = getSavedItems('todoItems')
    },
    deleteTodo(state, payload) {
        saveItems('todosBackup', state.todos)
        state.todos = [...state.todos].filter(item => item.id !== payload)
        saveItems('todoItems', state.todos)
    },

    createTodo(state, payload) {
        state.todos.push(payload)
        saveItems('todoItems', state.todos)
    },

    markTodoTask(state, payload) {
        const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
        const currenMessage = state.todos[currentTodoIdx].list.find(item => item.id === payload.messageId)
        currenMessage.isDone = !currenMessage.isDone
    },

    changeTodoTaskMessage(state, payload) {
        const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
        const currentMessage = state.todos[currentTodoIdx].list.find(item => item.id === payload.messageId)
        currentMessage.message = payload.newMessage
    },

    addTodoTask(state, payload) {
        const currentTodoIdx = state.todos.findIndex(item => item.id === payload.parentId);
        state.todos[currentTodoIdx].list.push(payload.task)
    },

    removeTodoTask(state, payload) {
        const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
        state.todos[currentTodoIdx].list = state.todos[currentTodoIdx].list.filter(task=> task.id !== payload.taskId)
    },

    cancelTodoChanging(state) {
        state.todos = getSavedItems('todoItems')
    },

    saveTodoChanges(state) {
        saveItems('todoItems', state.todos)
    },

    cancelLastChange(state) {
        state.todos = getSavedItems('todoItems')
    },

    repeatLastChanges(state) {
        const lastItem = JSON.parse(localStorage.getItem('todoBackup'))
        let currentTodo = state.todos.find(item => item.id === lastItem.id)
        for (let key in currentTodo) {
            currentTodo[key] = lastItem[key]
        }
    },
}