<template>
  <div class="container" v-if="dialog">
    <div
        class="alert"
        :class="settings.type"
    >
      <h1 class="alert__title">{{ settings.message }}</h1>
      <div class="alert__btns">
        <AppButton
            :customClass="settings.type"
            @click="$emit('click')"
        >Yes
        </AppButton>
        <AppButton
            :customClass="settings.type"
            @click="hideAlert"
        >No
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AppAlert",
  props: {
    settings: {
      type: Object,
      required: true
    },
    customClass: {
      type: String,
      required: false,
      default: ''
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
