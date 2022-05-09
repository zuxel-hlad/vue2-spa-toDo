<template>
  <section class="home">
    <TodoList/>
  </section>
</template>

<script>
import TodoList from "../components/TodoList";

export default {
  name: "Home",
  components: {TodoList}
}
</script>

<style scoped lang="scss">
</style>
