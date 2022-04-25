<template>
  <div
      :class="`
        confirm-dialog
        ${dialogSettings.type}
        ${customClass}`"
  >
    <h1 class="alert__title">
      {{ dialogSettings.message || 'Message is not defined' }}
    </h1>
    <div class="alert__btns">
      <app-button
          :customClass="`${dialogSettings.type} confirm-dialog__btn`"
          @click="$emit('action', true)"
      >Yes
      </app-button>
      <app-button
          :customClass="`${dialogSettings.type} confirm-dialog__btn`"
          @click="$emit('action', false)"
      >No
      </app-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "ConfirmDialog",
  props: {
    dialogSettings: {
      type: Object,
      required: false,
      default: () => {
      }
    },
    customClass: {
      type: String,
      required: false,
      default: ''
    }
  },
}
</script>

<style scoped lang="scss">
.confirm-dialog {
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &__btn {
    min-width: 80px;
  }
}
</style>
