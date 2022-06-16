<template>
  <div class="container">
    <div
        v-if="todos"
        class="card todo-wrapper">
      <header class="todo-wrapper__header">
        <h1 class="home__title">Todo List</h1>
        <app-button
            custom-class="todo-wrapper__create-new"
            @click="createTodoModal = true">
          <i class="fas fa-plus-circle primary"></i>
          <span>Create New</span>
        </app-button>
      </header>
      <TodoItem
          v-for="todo in todos"
          is-change
          is-delete
          :todo="todo"
          :key="todo.id"
          @delete="setRemovedTodoId(todo.id)"
          @change-todo="$router.push('/change/'+todo.id)"
      >
        <template #task v-if="todo">
          <TodoTask
              v-for="task in todo.list"
              :task="task"
              :key="task.id"
          />
        </template>
      </TodoItem>
    </div>
    <div v-else class="card todo-wrapper__empty-todo">
      <h1 class="todo-wrapper__no-todos">No todos yet. Add one ?</h1>
      <app-button
          @click="createTodoModal = true">
        Create new todo
      </app-button>
    </div>
    <basic-modal v-model="createTodoModal">
      <todo-create-form
          @create-todo="createNewTodo"
      />
    </basic-modal>
    <basic-modal v-model="confirmModal">
      <confirm-dialog
          :dialogSettings="confirmModalSettings"
          @action="removeTodo"
      />
    </basic-modal>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoTask from "./TodoTask";
import ConfirmDialog from "./ConfirmDialog";
import BasicModal from "./BasicModal";
import TodoCreateForm from "./TodoCreateForm";
import {mapMutations, mapState, mapActions} from 'vuex';
import AppButton from "./UI/AppButton";

export default {
  name: "TodoList",
  components: {
    AppButton,
    TodoItem,
    ConfirmDialog,
    BasicModal,
    TodoCreateForm,
    TodoTask
  },
  data() {
    return {
      createTodoModal: false,
      confirmModal: false,
      removedTodoId: null,
      confirmModalSettings: {
        message: 'Delete this todo ?',
        type: 'danger'
      }
    }
  },
  computed: {
    ...mapState('todosModule', {
      todos: state => state.todos,
    }),
  },
  mounted() {
    this.getTodos()
  },
  methods: {

    ...mapMutations('todosModule', ['deleteTodo', 'createTodo']),
    ...mapActions('todosModule', ['getTodos']),

    // add new todo to list of todos
    createNewTodo(data) {
      this.createTodo(data)
      this.createTodoModal = false
    },
    //set removed todo id
    setRemovedTodoId(id) {
      this.confirmModal = true
      this.removedTodoId = id
    },
    //remove todo on id
    removeTodo(answer) {
      if (answer) {
        this.deleteTodo(this.removedTodoId)
        this.confirmModal = false
      } else {
        this.confirmModal = false
      }
    }
  },
}
</script>

<style scoped lang="scss">

.todo-wrapper {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 0 16px 0;
  }

  &__create-new span {
    margin-left: 10px;
  }

  &__empty-todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    text-align: center;
  }
}
</style>