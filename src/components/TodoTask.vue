<template>
  <div class="card todo-wrapper__todos-todo">
    <div class="todo-wrapper__todos-content">
      <input
          v-if="$route.path === '/change/'+todoId"
          @change="markTodoTask({
            todoId: todoId,
            messageId:task.id
            })"
          :checked="task.isDone"
          type="checkbox"
          name="mark"
          class="todo-wrapper__checker"
      >
      <p v-if="!changeTaskFlag" class="todo-wrapper__todo-text">
        {{ task.message }}
      </p>
      <p v-else class="todo-wrapper__todo-text">
        <input
            type="text"
            @input="updateChangeTaskValue"
            :value="task.message"
            class="todo-wrapper__task-change"
            ref="newMessage"
        >
      </p>
    </div>
    <div class="todo-wrapper__todos-actions" v-if="$route.path==='/change/' + todoId">
      <button v-if="changeTaskFlag" class="todo-wrapper__list-button">
        <i class="fas fa-save primary" @click="changeTaskMessage(task.id)"></i>
      </button>
      <button class="todo-wrapper__list-button">
        <i class="fas fa-edit primary" @click="changeTaskToggle"></i>
      </button>
      <button class="todo-wrapper__list-button" title="delete-todo">
        <i class="fas fa-trash primary" @click="removeTodoTask({
              todoId: todoId,
              taskId: task.id
              })">
        </i>
      </button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "TodoTask",
  props: ['task', 'todoId'],
  data() {
    return {
      changeTaskFlag: false,
      changeTaskValue: ''
    }
  },
  methods:{
    ...mapMutations('todos', ['markTodoTask', 'removeTodoTask', 'changeTodoTaskMessage']),
    changeTaskToggle(){
      this.changeTaskFlag = true
    },
    changeTaskMessage(messageId) {
      this.changeTaskFlag = true
      this.changeTodoTaskMessage({
        todoId: this.todoId,
        messageId: messageId,
        newMessage: this.changeTaskValue
      })
      this.changeTaskFlag = false
    },
    updateChangeTaskValue(event) {
      this.changeTaskValue = event.target.value
    }
  }
}
</script>

<style scoped lang="scss">

.todo-wrapper {
  &__todos-todo {
    margin-top: 16px;
    padding: 5px 5px 5px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
  }

  &__todos-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__todos-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__checker {
    margin: 0 10px 0 0;
    cursor: pointer;
  }
  &__list-button {
    padding: 0;
    margin: 0;
    background: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    i {
      font-size: 16px;
      padding: 10px;
    }
  }
  &__task-change {
    font-size: 16px;
    line-height: 16px;
    border: none;
    outline: none;
  }
}

</style>
