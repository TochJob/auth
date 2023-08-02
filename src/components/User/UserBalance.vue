<script setup>
import { defineProps } from 'vue'


const props = defineProps({
  balance: {
    type: Array
  }
})
</script>
<template>
  <div class="balance">
    <h4 class="balance__title">Your balances</h4>
    <div class="balance__wrapper">
      <h3 class="balance__balances" v-for="(item, index) of balance" :key="index">
        <p class="balance__balances-currency">{{ item.attributes.currency }} :</p>
        <p class="balance__balances-current">
          {{ item.attributes.available.toLocaleString('ru') }}
        </p>
      </h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.balance {
  background: #b2b2b2;
  display: flex;
  flex-direction: column;
  gap: 15px;
  &__title{
    font-size: 20px;
  }
  &__wrapper {
    display: grid;
    gap: 20px;
  }
  &__balances {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid black;

    &-current{
      font-weight: 700;
      text-align: right;
    }
  }
}
</style>
