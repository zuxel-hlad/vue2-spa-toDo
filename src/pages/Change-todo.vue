<template>
  <section class="change">
    <AppAlert
        ref="removeTodoAlert"
        type="danger"
        message="Remove this todo?"
        @action="removeTodo"
    />
    <div class="container">
      <div v-if="!+$route.params.todoId" class="card change__empty">
        <h2>No todos for changing. Select on please.</h2>
        <router-link to="/home" tag="button" class="btn">Home</router-link>
      </div>
      <div v-else class="card">
        <div class="change__nav">
          <router-link tag="button" to="/home" class="btn change__btn">Home</router-link>
          <button class="btn change__btn">Save</button>
          <button class="btn change__btn">Cancel change</button>
          <button class="btn change__btn">Cancel last change</button>
          <button class="btn change__btn">Repeat last change</button>
        </div>
        <TodoItem
            :id="setData.id"
            :title="setData.title"
            :text="setData.list"
            @delete="$refs.removeTodoAlert.openAlert()"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TodoItem from "../components/TodoItem";
import {mapGetters, mapMutations} from 'vuex';
import AppAlert from "../components/AppAlert";

export default {
  name: "Change-todo",
  data() {
    return {}
  },
  methods: {
    ...mapMutations('todos', ['deleteTodo']),
    removeTodo() {
      this.deleteTodo(this.setData.id)
      this.$refs.removeTodoAlert.hideAlert()
      this.$router.push('/change')
    },
  },
  computed: {
    ...mapGetters('todos', ['allTodos']),
    setData() {
      return this.allTodos.find(item => item.id === +this.$route.params.todoId)
    }
  },
  components: {
    TodoItem,
    AppAlert
  }
}
</script>

<style scoped lang="scss">
.change {
  padding: 10px 0 0 0;

  &__empty {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__nav {
    display: flex;
    justify-content: center;
  }
}
</style>
