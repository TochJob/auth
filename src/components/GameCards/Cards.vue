<script setup>
import { onBeforeMount } from 'vue'
import CardItem from './CardItem.vue'
import { useGamesStore } from '../../stores/Cards'
import { storeToRefs } from 'pinia'

const GameStore = useGamesStore()
const games = storeToRefs(GameStore)

onBeforeMount(async () => {
  await GameStore.getGames()
})

function chooseGame(id) {
  GameStore.getGameLink(id)
}
</script>
<template>
  <section class="cards">
    <CardItem
      v-if="games.games.value.length"
      class="cards__item"
      :game="item"
      v-for="(item, index) of games.games.value"
      :key="item.id"
      @chooseGame="chooseGame"
    />
  </section>
</template>
<style lang="scss" scoped>
.cards {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
  &__item {
    flex-basis: 30%;
  }
}
</style>
