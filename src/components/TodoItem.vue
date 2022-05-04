<template>
  <div class="todo-task-container">
    <div
        class="card todo-wrapper__item">
      <nav class="todo-wrapper__nav">
        <ul class="todo-wrapper__nav-list">
          <li
              v-if="isChange"
              class="todo-wrapper__list-item">
            <app-button
                @click="$emit('change-todo')"
                customClass="todo-wrapper__list-button" title="change-todo">
              <i class="fas fa-edit primary"></i>
              <small>Change</small>
            </app-button>
          </li>
          <li
              v-if="isDelete"
              class="todo-wrapper__list-item">
            <app-button
                @click="$emit('delete')"
                customClass="todo-wrapper__list-button"
                title="delete-todo">
              <i class="fas fa-trash primary"></i>
              <small>Delete</small>
            </app-button>
          </li>
        </ul>
      </nav>
      <h2 class="todo__title" ref="todoTitles">{{ todo.title }}</h2>
      <div class="todo-wrapper__todos">
        <TodoTask
            v-for="task in todo.list"
            :task="task"
            :key="task.id"
            @delete-task="$emit('delete-task',task.id)"
            @set-is-done="$emit('set-is-done', task.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TodoTask from "./TodoTask";

export default {
  name: "TodoItem",
  components: {
    TodoTask
  },
  props: {
    todo: {
      type: Object,
      default: () => {
      },
      required: true
    },
    isChange: {
      type: Boolean,
      required: false,
      default: false
    },
    isDelete: {
      type: Boolean,
      required: false,
      default: false
    },
    contentEditable: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="scss">
.todo-wrapper {

  &__item {
    margin: 16px auto 16px;
    width: 100%;
    max-width: 700px;
    overflow: hidden;
  }

  &__nav-list {
    display: flex;
    list-style: none;
    justify-content: flex-end;
    align-items: flex-start;
  }

  &__list-button {
    padding: 0 7px;
    margin: 0;
    background: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:active {
      box-shadow: none;
    }

    i {
      font-size: 16px;
    }

    small {
      display: block;
      margin: 5px 0 0 0;
      font-size: 8px;
    }
  }
}
</style>
