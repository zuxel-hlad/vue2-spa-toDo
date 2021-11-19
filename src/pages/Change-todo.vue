<template>
  <section class="change">
    <div class="container">
      <div class="card">
        <TodoItem
            :id="setData.id"
            :title="setData.title"
            :text="setData.list"
        />
      </div>
      <button @click="show">qwqwqw</button>
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
  methods: {
    show() {
      console.log(this.setData)
    }
  },
  components: {
    TodoItem
  }
}
</script>

<style scoped>

</style>
