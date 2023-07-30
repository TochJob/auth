<script setup>
import { ref } from 'vue'
import CardItem from './CardItem.vue';

const game = [
  {
    image: '',
    title: 'Game1',
    id: 1
  }, {
    image: '',
    title: 'Game2',
    id: 1
  }, {
    image: '',
    title: 'Game3',
    id: 1
  }, {
    image: '',
    title: 'Game14',
    id: 1
  }
]
</script>
<template>
  <section class="cards">
    <CardItem />
  </section>
</template>
<style lang="scss" scoped></style>
