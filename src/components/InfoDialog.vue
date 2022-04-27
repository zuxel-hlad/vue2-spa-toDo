<template>
<div class="info-dialog">
  <h1 :class="`info-dialog__title ${settings.type}`">{{settings.title || 'Message is not defined'}}</h1>
  <h2
      v-if="settings.subtitle"
      class="info-dialog__subtitle">{{settings.subtitle}}</h2>
</div>
</template>

<script>
export default {
  name: "InfoDialog",
  props: {
    settings: {
      type: Object,
      default: () => {},
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.info-dialog {
  &__title {
    text-align: center;
  }

  &__subtitle {
    text-align: center;
  }
}
</style>