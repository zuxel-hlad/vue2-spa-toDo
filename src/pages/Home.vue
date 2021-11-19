<template>
  <section class="home" ref="top">
    <AppAlert
        type="danger"
        message="Delete this todo?"
        ref="deleteAlert"
        @action="confirmDeleteTodo"
    />
    <div class="container">
      <div class="card todo-wrapper">
        <div class="todo-wrapper__header">
          <h1 class="home__title">Todo List</h1>
          <button class="btn" @click="$router.push({
          path: '/create'
          })">
            Add new
          </button>
        </div>
        <TodoItem
            v-for="todo in allTodos"
            :title="todo.title"
            :text="todo.list"
            :key="todo.id"
            :id="todo.id"
            page-class="home-page"
            @delete="removeTodo"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TodoItem from "../components/TodoItem";
import AppAlert from "../components/AppAlert";
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      todoId: null
    }
  },
  methods: {
    //scroll to ref
    goTo(refName) {
      let element = this.$refs[refName]
      console.log(element)
      element.scrollIntoView({
        behavior: 'smooth',
        alignToTop: true
      })
    },
    ...mapMutations('todos', ['deleteTodo']),

    //remove current todo
    removeTodo(data) {
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
    ...mapGetters('todos', ['allTodos'])
  },
  components: {
    TodoItem,
    AppAlert
  },
}
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  padding: 10px 0 0 0;

  &__title {
    text-align: center;
  }

  .todo-wrapper {
    margin-top: 50px;
    min-height: 100vh;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
