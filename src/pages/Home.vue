<template>
  <section class="home" ref="top">
    <AppAlert
        :settings="alertSettings"
        ref="deleteAlert"
        @action="confirmDeleteTodo"
    />
    <div class="container">
      <div v-if="todos.length" class="card todo-wrapper">
        <div class="todo-wrapper__header">
          <h1 class="home__title">Todo List</h1>
          <button class="btn" @click="$router.push({
          path: '/create'
          })">
            Add new
          </button>
        </div>
        <TodoItem
            v-for="todo in todos"
            :title="todo.title"
            :text="todo.list"
            :key="todo.id"
            :id="todo.id"
            page-class="home-page"
            @delete="removeTodo"
        />
      </div>
      <div v-else class="card todo-wrapper__empty-todo">
        <h1 class="todo-wrapper__no-todos">No todos yet. Add one ?</h1>
        <router-link to="/create" tag="button" class="btn">Create new todo</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import TodoItem from "../components/TodoItem";
import AppAlert from "../components/AppAlert";
import {mapGetters, mapMutations, mapState} from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      todoId: null,
      alertSettings: {}
    }
  },
  methods: {
    //scroll to ref

    goTo(refName) {
      let element = this.$refs[refName]
      element.scrollIntoView({
        behavior: 'smooth',
        alignToTop: true
      })
    },
    ...mapMutations('todos', ['deleteTodo']),

    //remove current todo
    removeTodo(data) {
      this.alertSettings = {
        type: 'danger',
        message: 'Remove this todo?'
      }
      this.$refs.deleteAlert.openAlert()
      this.goTo('top')
      this.todoId = data
    },

    //confirm remove current todo
    confirmDeleteTodo() {
      this.deleteTodo(this.todoId)
      this.$refs.deleteAlert.hideAlert()
    },
  },
  computed: {
    // ...mapGetters('todos', ['allTodos'])
    // ...mapState('todos',['todos'])
    ...mapState({
      todos: state => state.todos.todos
    })
  },
  components: {
    TodoItem,
    AppAlert
  },
}
</script>

<style scoped lang="scss">
.home {
  padding: 10px 0 0 0;

  &__title {
    text-align: center;
  }

  .todo-wrapper {
    margin-top: 50px;

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
  }
}
</style>
