<template>
  <div class="card todo-wrapper__item">
    <nav class="todo-wrapper__nav">
      <ul class="todo-wrapper__nav-list">
        <li class="todo-wrapper__list-item">
          <button class="todo-wrapper__list-button" title="change-todo">
            <i class="fas fa-edit"></i>
          </button>
        </li>
        <li class="todo-wrapper__list-item">
          <button class="todo-wrapper__list-button" title="delete-todo">
            <i class="fas fa-trash"></i>
          </button>
        </li>
      </ul>
    </nav>
    <h2 class="todo__title">example title</h2>
    <p class="todo__text">Lorem ipsum dolor sit amet.</p>
  </div>
</template>

<script>
export default {
  name: "TodoItem"
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
    padding: 10px;
    background: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    i {
      font-size: 16px;
    }
  }
}
</style>
