<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style lang="scss">
.app {
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}

section {
  width: 100%;
}
</style>
