<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/Auth'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

const router = useRouter()
const authStore = useAuthStore()
const { errors, defineInputBinds } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      login: yup.string().min(3).required(),
      password: yup.string().min(3).required()
    })
  )
})

const inputsArray = ref([
  {
    type: 'login',
    placeholder: 'Enter your login',
    value: defineInputBinds('login')
  },
  {
    type: 'password',
    placeholder: 'Enter your password',
    value: defineInputBinds('password')
  }
])

async function submitLogin() {
  if (!Object.keys(errors.value).length) {
    const data = {
      clientId: 'default',
      login: inputsArray.value[0].value.value,
      password: inputsArray.value[1].value.value
    }
    const response = await authStore.loginUser(data)
    if (response) {
      console.log(123, router)
      router.push({
        name: 'main'
      })
    }
  }
}
</script>
<template>
  <div class="wrapper">
    <div class="auth">
      <form class="auth__form" @submit.prevent="submitLogin">
        <h1 class="auth__title">Log in</h1>
        <div class="auth__wrapper" v-for="(item, index) of inputsArray">
          <input
            type="text"
            class="input auth__input"
            v-bind="item.value"
            :placeholder="item.placeholder"
            required
            :key="index"
          />
          <p class="auth__error">{{ errors[item.type] }}</p>
        </div>
        <button class="button auth__button">Log In</button>
      </form>
    </div>
    <div class="layout">
      <img src="@/assets/images/AuthLayout.png" alt="layout" />
    </div>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
}

.auth {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #07021c;
  &__title {
    font-weight: 700;
    color: #07021c;
  }
  &__form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    gap: 15px;
    max-width: 70%;
  }
  &__input {
    padding: 15px;
    border-radius: 10px;
    min-width: 300px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    outline: none;
  }
  &__button {
    border: none;
    background: #000;
    color: #fff;
    padding: 12px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: #202020;
    }
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  &__error {
    color: rgb(250, 44, 44);
  }
}
.layout {
  background: linear-gradient(180deg, #62559b 0%, #2f2b55 100%);
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
