import localStorageService from "@/tools/localStorageService";

const {saveItems, getSavedItems} = localStorageService();

export default {

    getTodosFromDB(state) {
        if (getSavedItems('todoItems')) {
            state.todos = getSavedItems('todoItems')
        }
    },
    deleteTodo(state, payload) {
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
        saveItems('todoItems', state.todos)
    },

    updateTaskMessage(state, payload) {
        const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
        const task = state.todos[currentTodoIdx].list.find(item => item.id === payload.taskId)
        task.message = payload.newMessage
        saveItems('todoItems', state.todos)
    },

    addTodoTask(state, payload) {
        const currentTodoIdx = state.todos.findIndex(item => item.id === payload.parentId);
        state.todos[currentTodoIdx].list.push(payload.task)
        saveItems('todoItems', state.todos)
    },

    removeTodoTask(state, payload) {
        const currentTodoIdx = state.todos.findIndex(item => item.id === payload.todoId);
        state.todos[currentTodoIdx].list = state.todos[currentTodoIdx].list.filter(task => task.id !== payload.taskId)
        saveItems('todoItems', state.todos)
    },

    saveTodoChanges(state) {
        saveItems('todoItems', state.todos)
    },

    cancelLastChange(state) {
        state.todos = getSavedItems('todosBackup').map(item => item)
    },

    repeatLastChanges(state) {
        state.todos = getSavedItems('todoItems').map(item => item)
    },
}