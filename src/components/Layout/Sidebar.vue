<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/User'

import UserBalance from '../User/UserBalance.vue';

const UserStore = useUserStore()
const name = ref('')
const balance = storeToRefs(UserStore)

function getBalance() {
  UserStore.getUserBalance()
}

onMounted(() => {
  getBalance()
})
setInterval(getBalance, 30000)
</script>
<template>
  <section class="sidebar">
    <div class="sidebar__wrapper">
      <div class="sidebar__image">
        <img src="@/assets/images/EmptyUser.svg" alt="profile" class="sidebar__image-icon" />
      </div>
      <div class="sidebar__user">
        <h2 class="sidebar__user-name">Def. Def.</h2>
      </div>
    </div>
    <UserBalance :balance="balance.balance.value" />
  </section>
</template>
<style lang="scss" scoped>
.sidebar {
  background: #b2b2b2;
  border-radius: 30px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__image {
    width: 80px;
    height: 80px;
    background: #fff;
    padding: 10px;
    border-radius: 50%;

    &-icon {
      width: 100%;
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
  }

  &__user {
    display: flex;
    flex-direction: column;

    &-name {
      font-weight: 700;
      color: #ececec;
    }
  }
}
</style>
