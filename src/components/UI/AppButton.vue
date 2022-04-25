<template>
  <button
      :class="`btn ${customClass}`"
      @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    customClass: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>

<style scoped>

</style>