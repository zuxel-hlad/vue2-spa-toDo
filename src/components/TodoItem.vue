<template>
  <div
      :class="`todo-task-container ${customClass}`">
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
      <h2 class="todo__title">{{ todo.title }}</h2>
      <div class="todo-wrapper__todos">
        <slot name="task"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "TodoItem",
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
    },
    customClass:{
      type: String,
      default: '',
      required: false
    }
  },
}
</script>

<style scoped lang="scss">
.todo-wrapper {
  &__item {
    width: 100%;
    max-width: 700px;
    overflow: hidden;
    margin: 0 auto 1rem;
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
