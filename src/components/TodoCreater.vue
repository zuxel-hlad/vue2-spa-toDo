<template>
  <section class="todo-create">
    <div class="container">
      <div class="card">
        <form class="form-control todo-create__form" @submit.pr.prevent="createTodo(todoTitle)">
          <label>
            Add Todo Title
            <input v-model="todoTitle" class="todo-create__input" type="text" id="title">
          </label>
          <button class="btn">Add to list</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "TodoCreate",
  data() {
    return {
      todoTitle: ''
    }
  },
  methods: {
    ...mapMutations('todos', ['createTodo'])
  }
}
</script>

<style scoped lang="scss">
.todo-create {
  min-height: 100vh;

  &__form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    label {
      width: 100%;
      margin: 0;
    }
  }

  &__input {
    width: calc(100% - 40px);
    margin: 0;
  }
}
</style>