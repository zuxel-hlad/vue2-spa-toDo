<template>
  <div class="todo-task-container">
    <TodoTaskCreator ref="createTodoTaskModal" :todoId="id"/>
    <div
        class="card todo-wrapper__item">
      <nav class="todo-wrapper__nav">
        <ul class="todo-wrapper__nav-list">
          <li class="todo-wrapper__list-item">
            <button
                @click="$emit('save')"
                v-if="$route.path === '/change/'+id"
                class="todo-wrapper__list-button"
                title="save-todo">
              <i class="fas fa-save primary"></i>
              <small>Save</small>
            </button>
          </li>
          <li class="todo-wrapper__list-item">
            <button
                @click="$emit('cancel')"
                v-if="$route.path === '/change/'+id"
                class="todo-wrapper__list-button"
                title="cancel-change-todo">
              <i class="fas fa-ban primary"></i>
              <small>Cancel change</small>
            </button>
          </li>
          <li class="todo-wrapper__list-item">
            <button
                @click="$router.push('/change/'+id)"
                v-if="$route.path === '/' || $route.path === '/home'"
                class="todo-wrapper__list-button" title="change-todo"
            >
              <i class="fas fa-edit primary"></i>
              <small>Change</small>
            </button>
          </li>
          <li class="todo-wrapper__list-item">
            <button
                @click="$emit('delete', id)"
                class="todo-wrapper__list-button"
                title="delete-todo">
              <i class="fas fa-trash primary"></i>
              <small>Delete</small>
            </button>
          </li>
          <li class="todo-wrapper__list-item">
            <button
                @click="$emit('cancel-last-changes')"
                v-if="$route.path === '/change/'+id"
                class="todo-wrapper__list-button"
                title="cancel-last-changes">
              <i class="fas fa-redo primary"></i>
              <small>Cancel last changes</small>
            </button>
          </li>
          <li class="todo-wrapper__list-item">
            <button
                @click="$emit('repeat-last-changes')"
                v-if="$route.path === '/change/'+id"
                class="todo-wrapper__list-button"
                title="repeat-last-changes">
              <i class="fas fa-reply primary"></i>
              <small>Repeat last changes</small>
            </button>
          </li>
          <li class="todo-wrapper__list-item">
            <button
                @click="$refs.createTodoTaskModal.showModal()"
                v-if="$route.path === '/change/'+id"
                class="todo-wrapper__list-button"
                title="add-todo-task">
              <i class="fas fa-plus-circle primary"></i>
              <small>Add task</small>
            </button>
          </li>
        </ul>
      </nav>
      <h2 class="todo__title"> {{ title }}</h2>
      <div class="todo-wrapper__todos">
        <TodoTask
            v-for="task in text"
            :key="task.id"
            :task="task"
            :todoId="id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TodoTaskCreator from "./TodoTaskCreator";
import TodoTask from "./TodoTask";

export default {
  name: "TodoItem",
  props: ['title', 'text', 'id'],
  data() {
    return {}
  },
  components: {
    TodoTaskCreator,
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

    i {
      font-size: 16px;
    }

    small {
      display: block;
      margin: 5px 0 0 0;
      font-size: 12px;
    }
  }
}
</style>
