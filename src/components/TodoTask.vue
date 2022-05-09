<template>
  <div class="card todo-wrapper__todos-todo">
    <div class="todo-wrapper__todos-content">
      <input
          v-if="changeMenu && changeTaskFlag"
          type="checkbox"
          name="mark"
          class="todo-wrapper__checker"
          :checked="task.isDone"
          @change="$emit('set-is-done')">
      <p
          v-if="!changeTaskFlag"
          class="todo-wrapper__todo-text"
          :class="task.isDone ? 'todo-wrapper__todo-text_is-done': ''">
        {{ task.message }}
      </p>
      <p
          v-else
          class="todo-wrapper__todo-text">
        <input
            type="text"
            class="todo-wrapper__task-change"
            :placeholder="task.message"
            @input="$emit('change', $event.target.value)"
        >
      </p>
    </div>
    <div
        v-if="changeMenu"
        class="todo-wrapper__todos-actions">
      <app-button
          v-if="changeTaskFlag"
          class="todo-wrapper__list-button"
          title="edit-task-message"
          @click="changeTaskFlag = false">
        <i class="fas fa-check primary"></i>
      </app-button>
      <app-button
          v-if="!changeTaskFlag"
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
    changeMenu: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      changeTaskFlag: false,
    }
  },
  methods: {
    changeTaskToggle() {
      this.changeTaskFlag = true
    },
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

  &__todo-text {
    &_is-done {
      text-decoration: line-through;
    }
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
