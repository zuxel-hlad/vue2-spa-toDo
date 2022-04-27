<template>
  <section class="change">
    <basic-modal
        v-model="confirmModal">
      <confirm-dialog
          :dialogSettings="confirmModalSettings"
          @action="setConfirmModalAction"
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
            @create-task="createTaskModal = true"
            @cancel-edit="setCancelEditParams"
            @delete="setRemoveTodoParams"
            @save="saveChanges"
        />
      </div>
      <h2 v-else>loading . . .</h2>
    </div>
    <basic-modal
        v-model="confirmModal">
      <confirm-dialog
          :dialogSettings="confirmModalSettings"
          @action="setConfirmModalAction"
      />
    </basic-modal>
    <basic-modal v-model="createTaskModal">
      <createTaskForm
          @create-new-task="addNewTask"/>
    </basic-modal>
    <basic-modal v-model="infoModal">
         <info-dialog
             :settings="infoModalSettings"/>
    </basic-modal>
  </section>
</template>

<script>
import TodoItem from '../components/TodoItem';
import ConfirmDialog from '../components/ConfirmDialog';
import BasicModal from '../components/BasicModal';
import createTaskForm from "../components/createTaskForm";
import InfoDialog from "../components/InfoDialog";
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: 'Change-todo',
  components: {
    TodoItem,
    ConfirmDialog,
    BasicModal,
    createTaskForm,
    InfoDialog
  },
  props: {
    todoId: {
      type: String,
      Number,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      confirmModalSettings: {
        message: '',
        type: 'danger',
      },
      infoModal: false,
      infoModalSettings: {
        title:'Success!',
        subtitle: 'Changes was saved!',
        type: 'primary'
      },
      createTaskModal: false,
      confirmModal: false,
      confirmModalActionType: ''
    };
  },
  computed: {
    ...mapState('todosModule', {
      todos: (state) => state.todos,
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
      'addTodoTask'
    ]),
    ...mapActions('todosModule', ['getTodos']),
    setRemoveTodoParams() {
      this.confirmModalActionType = 'delete'
      this.confirmModal = true
      this.confirmModalSettings.message = 'Remove this todo ?'
    },

    setCancelEditParams() {
      this.confirmModalActionType = 'cancelChange'
      this.confirmModalSettings.message = 'Cancel edit ?'
      this.confirmModal = true
    },

    addNewTask(task) {
      this.addTodoTask({
        parentId: this.todoId,
        task
      })
      this.createTaskModal = false
    },

    saveChanges() {
      this.saveTodoChanges();
      this.infoModal = true
    },

    cancelLastChanges() {
    },

    setConfirmModalAction(answer) {
      if (answer && this.confirmModalActionType.indexOf('delete') !== -1) {
        this.deleteTodo(this.todoId)
        this.confirmModalActionType = ''
        this.confirmModal = false
        this.$router.push('/home')
      } else if (answer && this.confirmModalActionType.indexOf('cancelChange') !== -1) {
        this.confirmModalActionType = ''
        this.confirmModal = false
        this.$router.push('/home')
      } else {
        this.confirmModal = false;
        return false
      }
    }
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
