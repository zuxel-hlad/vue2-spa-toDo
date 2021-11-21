<template>
  <div class="todo-task-container">
    <TodoTaskCreator ref="createTodoTaskModal" :todoId="id"/>
    <div
        class="card todo-wrapper__item">
      <nav class="todo-wrapper__nav">
        <ul class="todo-wrapper__nav-list">
          <li class="todo-wrapper__list-item">
            <button v-if="$route.path === '/change/'+id" class="todo-wrapper__list-button" title="save-todo">
              <i class="fas fa-save primary" @click="$emit('save')"></i>
            </button>
          </li>
          <li class="todo-wrapper__list-item">
            <button v-if="$route.path === '/change/'+id" class="todo-wrapper__list-button" title="cancel-change-todo">
              <i class="fas fa-ban primary" @click="$emit('cancel')"></i>
            </button>
          </li>
          <li class="todo-wrapper__list-item">
            <router-link
                tag="button"
                :to="'/change/'+id"
                v-if="$route.path === '/' || $route.path === '/home'"
                class="todo-wrapper__list-button" title="change-todo"
            >
              <i class="fas fa-edit primary"></i>
            </router-link>
          </li>
          <li class="todo-wrapper__list-item">
            <button class="todo-wrapper__list-button" title="delete-todo">
              <i class="fas fa-trash primary" @click="$emit('delete', id)"></i>
            </button>
          </li>
          <li class="todo-wrapper__list-item">
            <button v-if="$route.path === '/change/'+id" class="todo-wrapper__list-button" title="cancel-last-changes">
              <i class="fas fa-redo primary" @click="$emit('cancel-last-changes')"></i>
            </button>
          </li>
          <li class="todo-wrapper__list-item">
            <button v-if="$route.path === '/change/'+id" class="todo-wrapper__list-button" title="repeat-last-changes">
              <i class="fas fa-reply primary" @click="$emit('repeat-last-changes')"></i>
            </button>
          </li>
          <li class="todo-wrapper__list-item">
            <button v-if="$route.path === '/change/'+id" class="todo-wrapper__list-button" title="add-todo-task">
              <i class="fas fa-plus-circle primary" @click="$refs.createTodoTaskModal.showModal()"></i>
            </button>
          </li>
        </ul>
      </nav>
      <h2 class="todo__title"> {{ title }}</h2>
      <div class="todo-wrapper__todos">
        <TodoTask v-for="task in text" :key="task.id" :task="task" :todoId="id"/>
      </div>
    </div>
  </div>
</template>

<script>
import TodoTaskCreator from "./TodoTaskCreator";
import TodoTask from "./TodoTask";

export default {
  name: "TodoItem",
  props: ['title', 'text', 'pageClass', 'id'],
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
}
</style>
