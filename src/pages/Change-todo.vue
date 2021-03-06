<template>
  <section
      class="change">
    <div class="container">
        <div
            v-if="todo"
            class="card change__wrapper">
          <nav class="change__nav card">
            <ul class="change__list">
              <li class="change__list-item">
                <app-button
                    custom-class="change__list-btn"
                    title="save-changes"
                    @click="saveChanges">
                  <i class="fas fa-save primary"></i>
                  <span>Save</span>
                </app-button>
              </li>
              <li class="change__list-item">
                <app-button
                    custom-class="change__list-btn"
                    title="cancel-edit"
                    @click="setCancelEditParams">
                  <i class="fas fa-ban primary"></i>
                  <span>Cancel edit</span>
                </app-button>
              </li>
              <li class="change__list-item">
                <app-button
                    custom-class="change__list-btn"
                    title="delete-todo"
                    @click="setRemoveTodoParams">
                  <i class="fas fa-trash primary"></i>
                  <span>Delete</span>
                </app-button>
              </li>
              <li class="change__list-item">
                <app-button
                    @click="cancelLastChanges"
                    custom-class="change__list-btn"
                    title="cancel-last-changes">
                  <i class="fas fa-redo primary"></i>
                  <span>Cancel changes</span>
                </app-button>
              </li>
              <li class="change__list-item">
                <app-button
                    @click="repeatChanges"
                    custom-class="change__list-btn"
                    title="repeat-last-changes">
                  <i class="fas fa-reply primary"></i>
                  <span>Repeat changes</span>
                </app-button>
              </li>
              <li class="change__list-item">
                <app-button
                    custom-class="change__list-btn"
                    title="add-task"
                    @click="createTaskModal = true">
                  <i class="fas fa-plus-circle primary"></i>
                  <span>Add task</span>
                </app-button>
              </li>
            </ul>
          </nav>
          <TodoItem
              custom-class="change__todo"
              :todo="todo"
          >
            <template #task>
              <TodoTask
                  v-for="task in todo.list"
                  changeMenu
                  :task="task"
                  :key="task.id"
                  @delete-task="setRemoveTodoTaskParams(task.id)"
                  @set-is-done="setTaskIsDone(task.id)"
                  @change="setNewTaskMessage($event,todo.id,task.id)"
              />
            </template>
          </TodoItem>
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
    <basic-modal
        v-model="confirmModal">
      <confirm-dialog
          :dialogSettings="confirmModalSettings"
          @action="setConfirmModalAction"
      />
    </basic-modal>
  </section>
</template>

<script>
import TodoItem from '../components/TodoItem';
import ConfirmDialog from '../components/ConfirmDialog';
import BasicModal from '../components/BasicModal';
import createTaskForm from "../components/createTaskForm";
import InfoDialog from "../components/InfoDialog";
import TodoTask from "../components/TodoTask";
import localStorageService from "../tools/localStorageService";

const {saveItems} = localStorageService()
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: 'Change-todo',
  components: {
    TodoItem,
    ConfirmDialog,
    BasicModal,
    createTaskForm,
    InfoDialog,
    TodoTask
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
        title: 'Success!',
        subtitle: 'Changes was saved!',
        type: 'primary'
      },
      createTaskModal: false,
      confirmModal: false,
      confirmModalActionType: '',
      removedTaskId: '',
    };
  },
  computed: {
    ...mapState('todosModule', {
      todos: (state) => state.todos,
    }),
    todo() {
      return this.todos.find((item) => item.id === this.todoId);
    },
    routeValidate(){
      return this.todo.id === this.$route.params.todoId
    }
  },
  mounted() {
    this.getTodos();
    saveItems('todosBackup', this.todos)
  },
  methods: {
    ...mapMutations('todosModule', [
      'deleteTodo',
      'saveTodoChanges',
      'cancelLastChange',
      'repeatLastChanges',
      'addTodoTask',
      'removeTodoTask',
      'markTodoTask',
      'updateTaskMessage'
    ]),
    ...mapActions('todosModule', ['getTodos']),
    setRemoveTodoParams() {
      this.confirmModalActionType = 'delete'
      this.confirmModal = true
      this.confirmModalSettings.message = 'Remove this todo ?'
    },

    setRemoveTodoTaskParams(id) {
      this.removedTaskId = id;
      this.confirmModalActionType = 'removeTask'
      this.confirmModal = true
      this.confirmModalSettings.message = 'Remove this task ?'
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
      this.cancelLastChange()
    },

    repeatChanges() {
      this.repeatLastChanges()
    },

    setTaskIsDone(id) {
      this.markTodoTask({
        todoId: this.todoId,
        messageId: id
      })
    },

    setNewTaskMessage(eventVal, todoId, taskId) {
      this.updateTaskMessage({
        newMessage: eventVal,
        todoId,
        taskId
      })
    },

    setConfirmModalAction(answer) {
      if (answer && this.confirmModalActionType.indexOf('delete') !== -1) {
        this.deleteTodo(this.todoId)
        this.confirmModalActionType = ''
        this.confirmModal = false
        this.$router.push('/')
      } else if (answer && this.confirmModalActionType.indexOf('removeTask') !== -1) {
        this.removeTodoTask({
          todoId: this.todoId,
          taskId: this.removedTaskId
        })
        this.confirmModalActionType = ''
        this.confirmModal = false
      } else if (answer && this.confirmModalActionType.indexOf('cancelChange') !== -1) {
        this.confirmModalActionType = ''
        this.confirmModal = false
        this.$router.push('/')
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

  &__not-found {
    display: block;
    max-width: 50%;
    margin: 0 auto;
    text-align: center;
  }

  &__wrapper {
    margin: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__nav {
    margin: 0 15px 0 0;
    width: 25%;
    @media screen and (max-width: 768px){
      width: 70px;
    }
  }

  &__list {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;

    &-item {
      &:not(:last-child) {
        margin: 0 0 8px 0;
      }
    }


    &-btn {
      width: 100%;
      padding: 0.5rem 1rem;
      margin: 0;
      background: transparent;
      display: flex;
      text-transform: none;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;

      i {
        font-size: 14px;
      }

      span {
        display: block;
        margin: 0 0 0 5px;
        font-size: 14px;
        font-weight: 500;
        @media screen and (max-width: 992px){
          font-size: 12px;
        }
        @media screen and (max-width: 768px){
          display: none;
        }
      }
      @media screen and (max-width: 768px){
        width: unset;
        padding: 10px;
      }
    }
  }

  &__todo {
    width: 75%;
    margin: 0;
    @media screen and (max-width: 768px){
      width: 100%;
    }
  }
}
</style>
