<template>
  <div id="app">
    <ToDoTask>
    </ToDoTask>
  </div>
</template>

<script>
import  ToDoTask  from "./components/Task.vue";

export default {
  name: 'App',
  components: {
    ToDoTask
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
