<template>
  <section class="change">
    <AppAlert
        ref="todoAlert"
        :settings="alertSettings"
        @click="setAlertActionType"
    />
    <div class="container">
      <div v-if="!+$route.params.todoId" class="card change__empty">
        <h2>No todos for changing. Select new.</h2>
        <router-link to="/home" tag="button" class="btn">Home</router-link>
      </div>
      <div v-else class="card">
        <TodoItem
            :id="setData.id"
            :title="setData.title"
            :text="setData.list"
            @delete="openRemoveAlert"
            @cancel="openCancelAlert"
            @save="saveChanges"
            @cancel-last-changes="cancelLastChanges"
            @repeat-last-changes="repeatLastChanges"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TodoItem from "../components/TodoItem";
import {mapState, mapMutations} from 'vuex';
import AppAlert from "../components/AppAlert";

export default {
  name: "Change-todo",
  data() {
    return {
      alertSettings: {},
      actionType: '',
    }
  },
  methods: {
    ...mapMutations(
        'todosModule',
        [
          'deleteTodo',
          'cancelTodoChanging',
          'saveTodoChanges',
          'cancelLastChange',
          "repeatLastChanges"
        ]),
    resetAlertSettings() {
      this.$refs.todoAlert.hideAlert()
      this.alertSettings = {};
      this.actionType = '';
    },
    openRemoveAlert() {
      this.alertSettings = {
        type: 'danger',
        message: 'Remove this todo?'
      }
      this.actionType = 'removeTodo';
      this.$refs.todoAlert.openAlert()
    },
    removeTodo() {
      this.deleteTodo(this.setData.id)
      this.resetAlertSettings()
      this.$router.push('/change')
    },

    openCancelAlert() {
      this.alertSettings = {
        type: 'warning',
        message: 'Cancel todo changing?'
      }
      this.actionType = 'cancelChanging';
      this.$refs.todoAlert.openAlert()
    },
    cancelChanging() {
      this.resetAlertSettings()
      this.$router.push('/home')
      this.cancelTodoChanging();
    },
    saveChanges() {
      this.saveTodoChanges();
      this.$router.push('/home')
    },
    cancelLastChanges() {
      this.cancelLastChange()
    },
    setAlertActionType() {
      if (this.actionType === 'removeTodo') {
        return this.removeTodo()
      }

      if (this.actionType === 'cancelChanging') {
        return this.cancelChanging()
      }
    }
  },
  computed: {
    ...mapState('todosModule', ['todos']),
    setData() {
      return this.todos.find(item => item.id === +this.$route.params.todoId)
    }
  },
  components: {
    TodoItem,
    AppAlert,
  }
}
</script>

<style scoped lang="scss">
.change {

  &__empty {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
