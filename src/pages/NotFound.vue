<template>
<section class="card not-found">
  <h1 class="not-found-title">Page not found</h1>
  <app-button @click="$router.push('/')">
    Go back
  </app-button>
</section>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped lang="scss">
.not-found {
  width: 50%;
  text-align: center;
}
</style>