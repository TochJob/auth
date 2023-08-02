import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import apiConfig from '../apiConfig/api.config'
import axios from 'axios'

const { apiAuthLogin, apirefreshToken } = apiConfig

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isUserAuth: false,
    status: '',
    tokens: {
      token: localStorage.getItem('token') || '',
      refresh: localStorage.getItem('refreshToken') || ''
    }
  }),
  actions: {
    async loginUser(data) {
      try {
        this.auth_request()
        const response = await axios.post(apiAuthLogin, data)
        const tokens = response.data.data[0].attributes
        console.log('tokens', tokens)
        this.authorizationTokens(tokens.token, tokens['refresh-token'])
        return true
      } catch (error) {
        this.auth_error()
        this.logout()
        console.log(error)
      }
    },
    async refreshToken(refreshToken) {
      console.log('refreshToken', refreshToken)
      try {
        const response = await axios.post(apirefreshToken, {
          clientId: 'default',
          refreshToken: refreshToken
        })
        const tokens = response.data

        this.authorizationTokens(tokens.token, tokens['refresh-token'])
        return response.data
      } catch (error) {
        this.logout()
        console.log(error)
      }
    },
    authorizationTokens(token, refresh) {
      this.auth_success({ token: token, refresh: refresh })
    },
    auth_request() {
      this.status = 'loading'
    },
    auth_success(payload) {
      this.status = 'success'
      localStorage.setItem('token', payload.token)
      localStorage.setItem('refreshToken', payload.refresh)
      this.tokens.token = payload.token
      this.tokens.refresh = payload.refresh
      this.isUserAuth = true
    },
    auth_error() {
      this.status = 'error'
    },
    logout() {
      this.status = ''
      this.tokens.token = ''
      this.tokens.refresh = ''
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      this.isUserAuth = false
      window.location.href = ''
      const router = useRouter();
      console.log(router);
      router.push({ name: 'login' });
    }
  }
})
