<template>
  <div class="todo-task-creator">
    <form
        class="form-control todo-task-creator__form"
        @submit.prevent="addNewTask">
      <label
          for="task-message"
          class="todo-task-creator__form">
          Enter task message
      </label>
      <input
          v-model="taskMessage"
          type="text"
          id="task-message"
          class="todo-task-creator__form-input">
      <AppButton
          class="todo-task-creator__form-btn">
        Create
      </AppButton>
    </form>
  </div>
</template>

<script>

import idGenerator from "../tools/idGenerator";

export default {
  name: "createTaskForm",
  data() {
    return {
      taskMessage: '',
    }
  },
  methods: {
    addNewTask() {
      if (this.taskMessage) {
        const newTask = {
          message: this.taskMessage,
          isDone: false,
          id: idGenerator()
        }
        this.$emit('create-new-task', newTask)
        this.taskMessage = ''
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.todo-task-creator {
  &__form {
    &-btn {
      display: block;
      margin: 10px 0 0 auto;
    }
  }
}
</style>