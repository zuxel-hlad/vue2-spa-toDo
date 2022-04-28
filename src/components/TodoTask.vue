<template>
  <div class="card todo-wrapper__todos-todo">
    <div class="todo-wrapper__todos-content">
      <input
          v-if="$route.path !== '/'"
          type="checkbox"
          name="mark"
          class="todo-wrapper__checker"
      >
      <p
          v-if="!changeTaskFlag"
          class="todo-wrapper__todo-text">
        {{ task.message }}
      </p>
      <p
          v-else
          class="todo-wrapper__todo-text">
        <input
            type="text"
            class="todo-wrapper__task-change"
            ref="newMessage"
        >
      </p>
    </div>
    <div
        v-if="$route.path !== '/' || $route.path !== '/home'"
        class="todo-wrapper__todos-actions">
      <app-button
          class="todo-wrapper__list-button"
          title="edit-task-message"
          @click="changeTaskToggle"
      >
        <i class="fas fa-edit primary"></i>
      </app-button>
      <app-button
          class="todo-wrapper__list-button"
          title="delete-task"
          @click="$emit('delete-task')">
        <i class="fas fa-trash primary">
        </i>
      </app-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "TodoTask",
  props: {
    task: {
      type: Object,
      default: () => {
      },
      required: false
    },
    currentTodoID: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      changeTaskFlag: false,
      changeTaskValue: ''
    }
  },
  methods: {
    changeTaskToggle() {
      this.changeTaskFlag = true
    },
    changeTaskMessage(messageId) {
      this.changeTaskFlag = true
      this.changeTodoTaskMessage({
        todoId: this.todoId,
        messageId: messageId,
        newMessage: this.changeTaskValue
      })
      this.changeTaskFlag = false
    },
    updateChangeTaskValue(event) {
      this.changeTaskValue = event.target.value
    }
  }
}
</script>

<style scoped lang="scss">

.todo-wrapper {
  &__todos-todo {
    margin-top: 16px;
    padding: 5px 5px 5px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
  }

  &__todos-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__todos-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__checker {
    margin: 0 10px 0 0;
    cursor: pointer;
  }

  &__list-button {
    padding: 0;
    margin: 0;
    background: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    i {
      font-size: 16px;
      padding: 10px;
    }
  }

  &__task-change {
    font-size: 16px;
    line-height: 16px;
    border: none;
    outline: none;
  }
}

</style>
