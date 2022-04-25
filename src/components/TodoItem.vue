<template>
  <div class="todo-task-container">
    <div
        class="card todo-wrapper__item">
      <nav class="todo-wrapper__nav">
        <ul class="todo-wrapper__nav-list">
          <li
              v-if="isSave"
              class="todo-wrapper__list-item">
            <app-button
                @click="$emit('save')"
                customClass="todo-wrapper__list-button"
                title="save-todo">
              <i class="fas fa-save primary"></i>
              <small>Save</small>
            </app-button>
          </li>
          <li
              v-if="isCancel"
              class="todo-wrapper__list-item">
            <app-button
                @click="$emit('cancel-edit')"
                customClass="todo-wrapper__list-button"
                title="cancel-change-todo">
              <i class="fas fa-ban primary"></i>
              <small>Cancel change</small>
            </app-button>
          </li>
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
          <li
              v-if="isCancelLastChanges"
              class="todo-wrapper__list-item">
            <app-button
                @click="$emit('cancel-last-changes')"
                customClass="todo-wrapper__list-button"
                title="cancel-last-changes">
              <i class="fas fa-redo primary"></i>
              <small>Cancel last changes</small>
            </app-button>
          </li>
          <li
              v-if="isRepeatLastChanges"
              class="todo-wrapper__list-item">
            <app-button
                @click="$emit('repeat-last-changes')"
                customClass="todo-wrapper__list-button"
                title="repeat-last-changes">
              <i class="fas fa-reply primary"></i>
              <small>Repeat last changes</small>
            </app-button>
          </li>
          <li
              v-if="isCreateTask"
              class="todo-wrapper__list-item">
            <app-button
                @click="$emit('create-task')"
                customClass="todo-wrapper__list-button"
                title="add-todo-task">
              <i class="fas fa-plus-circle primary"></i>
              <small>Add task</small>
            </app-button>
          </li>
          <li
              v-if="isCreateNew"
              class="todo-wrapper__list-item">
            <app-button
                @click="$emit('create-new')"
                customClass="todo-wrapper__list-button"
                title="add-todo-task">
              <i class="fas fa-plus-circle primary"></i>
              <small>Add new</small>
            </app-button>
          </li>
        </ul>
      </nav>
      <h2 class="todo__title"> {{ todo.title }}</h2>
      <div class="todo-wrapper__todos">
        <TodoTask
            v-for="task in todo.list"
            :task="task"
            :currentTodoID="todo.id"
            :key="task.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TodoTask from "./TodoTask";

export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      default: () => {},
      required: true
    },
    isSave: {
      type: Boolean,
      required: false,
      default: false
    },
    isCancel: {
      type: Boolean,
      required: false,
      default: false
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
    isCancelLastChanges: {
      type: Boolean,
      required: false,
      default: false
    },
    isRepeatLastChanges: {
      type: Boolean,
      required: false,
      default: false
    },
    isCreateTask: {
      type: Boolean,
      required: false,
      default: false
    },
    isCreateNew: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {}
  },
  components: {
    TodoTask
  }
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
