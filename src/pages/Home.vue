<template>
  <section class="home">
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
        />
      </div>
    </div>
  </section>
</template>

<script>
import TodoItem from "../components/TodoItem";
import {mapGetters} from 'vuex';

export default {
  name: "Home",
  data() {
    return {}
  },
  components: {
    TodoItem
  },
  computed: {
    ...mapGetters('todos', ['allTodos'])
  },
}
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;

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
