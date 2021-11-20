<template>
  <div class="container" v-if="dialog">
    <div
        class="alert"
        :class="type"
    >
      <h1 class="alert__title">{{ message }}</h1>
      <div class="alert__btns">
        <button
            :class="type"
            class="btn alert__btn"
            @click="$emit('action')"
        >Yes
        </button>
        <button
            :class="type"
            class="btn alert__btn"
            @click.stop="hideAlert"
        >No
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AppAlert",
  props: {
    type: {
      type: String,
      required: true,
      default: ''
    },
    message: {
      type: String,
      required: true,
      default: ''
    },
    todoId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    openAlert() {
      this.dialog = true
    },
    hideAlert() {
      this.dialog = false
    },
  }
}
</script>

<style scoped lang="scss">
alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
