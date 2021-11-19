<template>
  <section class="change">
    <div class="container">
      <div class="card">
        <router-link tag="button" to="/home" class="btn change__btn">Home</router-link>
        <TodoItem
            :id="setData.id"
            :title="setData.title"
            :text="setData.list"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TodoItem from "../components/TodoItem";
import {mapGetters} from 'vuex';

export default {
  name: "Change-todo",
  props: ['todoId'],
  computed: {
    ...mapGetters('todos', ['allTodos']),
    setData() {
      return this.allTodos.find(item => item.id === +this.$route.params.todoId)
    }
  },
  components: {
    TodoItem
  }
}
</script>

<style scoped lang="scss">
.change {
  &__btn {
    margin: 0 0 0 auto;
    display: block;
  }
}
</style>
