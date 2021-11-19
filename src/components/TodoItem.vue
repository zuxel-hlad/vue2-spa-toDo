<template>
  <div
      class="card todo-wrapper__item"
      :class="pageClass === 'home-page' ? 'home-page': ''"
  >
    <nav class="todo-wrapper__nav">
      <ul class="todo-wrapper__nav-list">
        <li class="todo-wrapper__list-item">
          <button v-if="$route.path === '/change'" class="todo-wrapper__list-button" title="change-todo">
              <i class="fas fa-edit primary"></i>
          </button>
          <button v-else class="todo-wrapper__list-button" title="change-todo">
            <router-link :to="'/change/' + id">
              <i class="fas fa-edit primary"></i>
            </router-link>
          </button>
        </li>
        <li class="todo-wrapper__list-item">
          <button class="todo-wrapper__list-button" title="delete-todo">
            <i class="fas fa-trash primary" @click="deleteTodo(id)"></i>
          </button>
        </li>
      </ul>
    </nav>
    <h2 class="todo__title"> {{ title }}</h2>
    <div v-if="text" class="todo-wrapper__todos">
      <p v-for="item in text" class="card todo-wrapper__todo-text">
        <input
            v-model="mark"
            type="checkbox"
            name="mark"
            class="todo-wrapper__checker"
        >
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';

export default {
  name: "TodoItem",
  props: ['title', 'text', 'pageClass', 'id'],
  data() {
    return {
      mark: []
    }
  },

  methods: {
    ...mapMutations('todos', ['deleteTodo'])
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

  &__item.home-page .todo-wrapper__checker {
    display: none;
  }

  &__item.home-page .todo-wrapper__todo-text {
    padding: 5px 15px;
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

  &__todo-text {
    margin-top: 16px;
    padding: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__checker {
    margin: 0 20px 0 0;
    cursor: pointer;
  }
}
</style>
