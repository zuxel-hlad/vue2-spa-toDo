<template>
  <div
      v-if="visible"
      class="todo-task-creator"
      :class="visible ? 'todo-task-creator_visible' : ''"
  >
    <div class="todo-task-creator__wrapper">
      <button class="todo-task-creator__wrapper-close" @click="hideModal">
        <i class="fas fa-times-circle primary"></i>
      </button>
      <form class="form-control todo-task-creator__form" @submit.prevent="addNewTask">
        <label for="task-message" class="todo-task-creator__form">Enter task message</label>
        <input v-model="taskMessage" type="text" id="task-message" class="todo-task-creator__form-input">
        <AppButton class="todo-task-creator__form-btn">Create</AppButton>
      </form>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "TodoTaskCreator",
  props: ['todoId'],
  data() {
    return {
      visible: false,
      taskMessage: ''
    }
  },
  methods: {
    ...mapMutations('todosModule', ['addTodoTask']),
    showModal() {
      this.visible = true
    },
    hideModal() {
      this.visible = false
    },
    addNewTask() {
      if (this.taskMessage) {
        this.addTodoTask({
          todoId: this.todoId,
          message: this.taskMessage
        })
        this.taskMessage = ''
        this.hideModal()
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">

@keyframes show {

  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }

}

.todo-task-creator {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, .3);

  &_visible {
    animation: show .2s linear;
  }

  &__wrapper {
    position: absolute;
    padding: 15px;
    border-radius: 6px;
    background: #fff;
    width: 100%;
    min-height: 50px;
    max-width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &-close {
      position: absolute;
      z-index: 1;
      cursor: pointer;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 5px;
      right: 10px;
      padding: 0;
      margin: 0;
      background: transparent;
      border: none;

      i {
        display: block;
        font-size: 20px;
        padding: 10px;
        cursor: pointer;
      }
    }
  }

  &__form {
    &-btn {
      display: block;
      margin: 10px 0 0 auto;
    }
  }
}
</style>
