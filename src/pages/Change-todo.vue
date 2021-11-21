<template>
  <section class="change">
    <AppAlert
        ref="todoAlert"
        :settings="alertSettings"
        @action="setAlertActionType"
    />
    <div class="container">
      <div v-if="!+$route.params.todoId" class="card change__empty">
        <h2>No todos for changing. Select one please.</h2>
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
    return {
      alertSettings: {},
      actionType: '',
    }
  },
  methods: {
    ...mapMutations('todos', ['deleteTodo', 'cancelTodoChanging', 'saveTodoChanges']),
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
    saveChanges(){
      this.saveTodoChanges();
      this.$router.push('/home')
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
    ...mapGetters('todos', ['allTodos']),
    setData() {
      return this.allTodos.find(item => item.id === +this.$route.params.todoId)
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
  padding: 10px 0 0 0;

  &__empty {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
