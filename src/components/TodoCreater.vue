<template>
  <section class="todo-create">
    <div class="container">
      <div class="card">
        <form class="form-control todo-create__form" @submit.pr.prevent.keypress.enter="addNewTodo">
          <label>
            <span class="todo-create__form-text">Add new todo title</span>
            <input v-model="todoTitle" class="todo-create__input" type="text" id="title" ref="createTodoInput">
          </label>
          <div class="todo-create__form-back" @click="$router.push('/home')">
            <i class="fas fa-long-arrow-alt-left"></i>
            <span>Home</span>
          </div>
          <AppButton>Add to list</AppButton>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "TodoCreate",
  data() {
    return {
      todoTitle: ''
    }
  },
  methods: {
    ...mapMutations('todosModule', ['createTodo']),
    addNewTodo() {
      if (this.todoTitle !== '') {
        this.createTodo(this.todoTitle)
        this.$router.push('/home')
      }
    }
  },
  mounted() {
    this.$refs.createTodoInput.focus()
  }
}
</script>

<style scoped lang="scss">
.todo-create {

  &__form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;

    &-text {
      display: block;
      margin-bottom: 10px;
      font-weight: 700;
      font-size: 18px;
    }

    &-back {
      position: absolute;
      cursor: pointer;
      color: #3eaf7c;
      width: 100px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      top: 0;
      right: 20px;

      span {
        padding-left: 15px;
      }
    }

    label {
      width: 100%;
      margin: 0;
    }
  }

  &__input {
    width: calc(100% - 40px);
    margin: 0;
  }
}
</style>
