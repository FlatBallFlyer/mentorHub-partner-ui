<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import HomeView from './views/HomeView.vue';
</script>

<template>
  <header>

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <HomeView />
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
