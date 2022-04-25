<template>
  <div class="card todo-create">
    <form class="form-control todo-create__form" @submit.pr.prevent.keypress.enter="addNewTodo">
      <label>
        <span class="todo-create__text">Add new todo title</span>
        <input
            v-model="todoTitle"
            class="todo-create__input"
            type="text" id="title"
            ref="createTodoInput">
      </label>
      <app-button
          customClass="todo-create__btn"
      >Add to list
      </app-button>
    </form>
  </div>
</template>

<script>
import idGenerator from "@/tools/idGenerator";

export default {
  name: "TodoCreateTaskForm",
  data() {
    return {
      todoTitle: ''
    }
  },
  methods: {
    addNewTodo() {
      if (this.todoTitle !== '') {
        const newTodo = {
          title: this.todoTitle,
          id: idGenerator(),
          list: [],
        }
        this.$emit('create-todo', newTodo)
      }
    }
  },
  mounted() {
    this.$refs.createTodoInput.focus()
  }
}
</script>

<style scoped lang="scss">
.todo-create {
  margin: 0;

  &__text {
    display: block;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 18px;
  }

  &__input {
    width: 100%;
    margin: 0;
  }

  label {
    width: 100%;
    margin: 0 0 20px 0;
  }

  &__btn {
    display: block;
    margin: 0 0 0 auto;
  }
}
</style>
