<template>
    <section class="home">
      <div class="container">
        <div class="card todo-wrapper">
          <div class="todo-wrapper__header">
            <h1 class="home__title">Todo List</h1>
            <button class="btn">Add new</button>
          </div>
          <TodoItem/>
        </div>
      </div>
    </section>
</template>

<script>
import TodoItem from "../components/TodoItem";

export default {
  name: "Home",
  components: {
    TodoItem
  }
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
