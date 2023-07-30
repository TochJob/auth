<script setup>
import Sidebar from '../components/Layout/Sidebar.vue';
import Cards from "../components/GameCards/Cards.vue"

</script>
<template>
  <section class="main">
    <Sidebar class="main__sidebar" />
    <Cards class="main__cards" />
  </section>
</template>
<style lang="scss" scoped>
.main {
  display: flex;
  padding: 20px;
  background: #2d2d2d;

  &__sidebar {
    width: 20%;
  }
}
</style>
