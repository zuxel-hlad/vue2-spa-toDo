<template>
  <section class="change">
    <basic-modal v-model="confirmModal">
      <confirm-dialog
          :dialogSettings="confirmModalSettings"
          @action="setAlertActionType"
      />
    </basic-modal>
    <div class="container">
      <div
          v-if="todo"
          class="card">
        <TodoItem
            :todo="todo"
            is-save
            is-cancel
            is-delete
            is-cancel-last-changes
            is-repeat-last-changes
            is-create-task
            @delete="removeTodo(todo.id)"
        />
      </div>
      <h2 v-else>loading . . .</h2>
    </div>
  </section>
</template>

<script>
import TodoItem from '../components/TodoItem';
import ConfirmDialog from '../components/ConfirmDialog';
import BasicModal from '../components/BasicModal';
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: 'Change-todo',
  props: {
    todoId: {
      type: String,
      Number,
      default: '',
      required: true,
    },
  },
  components: {
    TodoItem,
    ConfirmDialog,
    BasicModal,
  },
  data() {
    return {
      confirmModalSettings: {
        message: '',
        type: 'danger',
      },
      confirmModal: false,
      actionType: '',
    };
  },
  computed: {
    ...mapState('todosModule', {
      todos: (state) => state.todos,
      loader: (state) => state.loader,
    }),
    todo() {
      return this.todos.find((item) => item.id === this.todoId);
    },
  },
  mounted() {
    this.getTodos();
  },
  methods: {
    ...mapMutations('todosModule', [
      'deleteTodo',
      'cancelTodoChanging',
      'saveTodoChanges',
      'cancelLastChange',
      'repeatLastChanges',
    ]),
    ...mapActions('todosModule', ['getTodos']),
    resetAlertSettings() {
      this.alertSettings = {};
      this.actionType = '';
    },
    openRemoveAlert() {
      this.alertSettings = {
        type: 'danger',
        message: 'Remove this todo?',
      };
      this.actionType = 'removeTodo';
    },
    removeTodo(id) {
      this.confirmModal = true
      this.confirmModalSettings.message = 'Remove this todo ?'
      // this.deleteTodo(id);
      // this.$router.push('/');
    },

    openCancelAlert() {
      this.alertSettings = {
        type: 'warning',
        message: 'Cancel todo changing?',
      };
      this.actionType = 'cancelChanging';
    },
    cancelChanging() {
      this.resetAlertSettings();
      this.$router.push('/home');
      this.cancelTodoChanging();
    },
    saveChanges() {
      this.saveTodoChanges();
      this.$router.push('/home');
    },
    cancelLastChanges() {
      this.cancelLastChange();
    },
    setAlertActionType() {
      if (this.actionType === 'removeTodo') {
        return this.removeTodo();
      }

      if (this.actionType === 'cancelChanging') {
        return this.cancelChanging();
      }
    },
  },
};
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
