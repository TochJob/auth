<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  game: {
    type: Object
  }
})
const emit = defineEmits(['chooseGame'])
function chooseGame(id) {
  emit('chooseGame', id)
}
</script>
<template>
  <div>
    <div class="card" @click="chooseGame(props.game.id)">
      <img class="card__image" :src="props?.game.attributes.image" alt="game" />
      <h4 class="card__title">{{ props?.game.attributes.title }}</h4>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card {
  background: #908e8e;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    .card {
      &__image {
        transform: scale(1.1);
      }
      &__title {
        text-shadow: #fc0 1px 0 10px;
      }
    }
  }
  &__image {
    border-radius: 15px 15px 0 0;
    object-fit: cover;
    width: 100%;
    height: 340px;
    transition: all 0.3s;
  }
  &__title {
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    transition: all 0.3s;
    padding: 20px;
  }
}
</style>
