<template>
  <div
      v-if="value"
      class="overlay"
      :class="value ? 'overlay_visible' : ''"
      @click.stop="$emit('input', false)"
  >
    <div class="overlay-wrapper" @click.stop>
      <button
          class="overlay-wrapper__close"
          @click="$emit('input', false)"
      >
        <i class="fas fa-times-circle primary"></i>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name:'BasicModal',
  props:{
    value: {
      type: Boolean,
      default: false,
      required: true
    }
  },
}
</script>

<style scoped lang="scss">

@keyframes show {

  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }

}

.overlay {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, .3);

  &_visible {
    animation: show .2s linear;
  }

  &-wrapper {
    position: absolute;
    padding: 25px;
    border-radius: 6px;
    background: #fff;
    width: 100%;
    min-height: 50px;
    max-width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &__close {
      position: absolute;
      z-index: 1;
      cursor: pointer;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 5px;
      right: 10px;
      padding: 0;
      margin: 0;
      background: transparent;
      border: none;

      i {
        display: block;
        font-size: 20px;
        padding: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
