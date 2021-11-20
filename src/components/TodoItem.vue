<template>
  <div
      class="card todo-wrapper__item">
    <nav class="todo-wrapper__nav">
      <ul class="todo-wrapper__nav-list">
        <li class="todo-wrapper__list-item">
          <button v-if="$route.path === '/change/'+id" class="todo-wrapper__list-button" title="change-todo">
            <i class="fas fa-plus-circle primary"></i>
          </button>
        </li>
        <li class="todo-wrapper__list-item">
          <button v-if="$route.path === '/change/'+id" class="todo-wrapper__list-button" title="change-todo">
            <i class="fas fa-history primary"></i>
          </button>
        </li>
        <li class="todo-wrapper__list-item">
          <button class="todo-wrapper__list-button" title="change-todo">
            <button class="todo-wrapper__list-button" v-if="$route.path==='/change/' + id">
              <i class="fas fa-edit primary"></i>
            </button>
            <router-link v-else :to="'/change/' + id">
              <i class="fas fa-edit primary"></i>
            </router-link>
          </button>
        </li>
        <li class="todo-wrapper__list-item">
          <button v-if="$route.path==='/change/' + id" class="todo-wrapper__list-button" title="delete-todo">
            <i class="fas fa-trash primary" @click="$emit('delete', id)"></i>
          </button>

          <button v-else class="todo-wrapper__list-button" title="delete-todo">
            <i class="fas fa-trash primary" @click="$emit('delete', id)"></i>
          </button>
        </li>
      </ul>
    </nav>
    <h2 class="todo__title"> {{ title }}</h2>
    <div v-if="text" class="todo-wrapper__todos">
      <div class="card todo-wrapper__todos-todo" v-for="item in text">
        <div class="todo-wrapper__todos-content">
          <input
              v-if="$route.path === '/change/'+id"
              @change="markTodoTask({
            todoId: id,
            messageId:item.id
            })"
              :checked="item.isDone"
              type="checkbox"
              name="mark"
              class="todo-wrapper__checker"
          >
          <p class="todo-wrapper__todo-text" :key="item.id">
            {{ item.message }}
          </p>
        </div>
        <div class="todo-wrapper__todos-actions" v-if="$route.path==='/change/' + id">
          <button class="todo-wrapper__list-button" title="change-todo">
            <i class="fas fa-plus-circle primary"></i>
          </button>
          <button class="todo-wrapper__list-button" title="delete-todo">
            <i class="fas fa-trash primary"></i>
          </button>
          <button class="todo-wrapper__list-button">
            <i class="fas fa-edit primary"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "TodoItem",
  props: ['title', 'text', 'pageClass', 'id'],
  data() {
    return {}
  },
  methods: {
    ...mapMutations('todos', ['markTodoTask'])
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
    margin: 0 10px 0 0px;
    cursor: pointer;
  }
}
</style>
