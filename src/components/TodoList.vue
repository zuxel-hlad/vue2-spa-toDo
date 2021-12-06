<template>
  <div class="container">
    <AppAlert
        :settings="alertSettings"
        ref="deleteAlert"
        @click="confirmDeleteTodo"
    />
    <div v-if="todos.length" class="card todo-wrapper">
      <div class="todo-wrapper__header">
        <h1 class="home__title">Todo List</h1>
        <AppButton @click="$router.push({path: '/create'})">Add new</AppButton>
      </div>
      <TodoItem
          v-for="todo in todos"
          :title="todo.title"
          :text="todo.list"
          :key="todo.id"
          :id="todo.id"
          @delete="removeTodo"
      />
    </div>
    <div v-else class="card todo-wrapper__empty-todo">
      <h1 class="todo-wrapper__no-todos">No todos yet. Add one ?</h1>
      <AppButton @click="$router.push('/create')">Create new todo</AppButton>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import AppAlert from "../components/AppAlert";
import {mapMutations, mapState} from 'vuex';

export default {
  name: "TodoList",
  data() {
    return {
      todoId: null,
      alertSettings: {}
    }
  },
  methods: {

    ...mapMutations('todosModule', ['deleteTodo']),

    //remove current todo
    removeTodo(data) {
      this.alertSettings = {
        type: 'danger',
        message: 'Remove this todo?'
      }
      this.$refs.deleteAlert.openAlert()
      this.todoId = data
    },

    //confirm remove current todo
    confirmDeleteTodo() {
      this.deleteTodo(this.todoId)
      this.$refs.deleteAlert.hideAlert()
    },
  },
  computed: {
    ...mapState('todosModule', ["todos"])
  },
  components:{
    TodoItem,
    AppAlert
  }
}
</script>

<style scoped lang="scss">

.todo-wrapper {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__empty-todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    text-align: center;
  }
}
</style>