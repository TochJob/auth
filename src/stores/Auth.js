import { defineStore } from 'pinia'
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
        this.authorizationTokens(response.token, response[refresh - token])
      } catch (error) {
        this.auth_error()
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')

        console.log(error)
      }
    },
    async refreshToken() {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        this.logout()
      }
      try {
        const response = await axios.post(apirefreshToken, refreshToken)
        this.authorizationTokens(response.token, response[refresh - token])
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    authorizationTokens(token, refresh) {
      this.tokens.token = response.token
      this.tokens.refresh = response[refresh - token]
      console.log(response)
      this.auth_success({ token: this.tokens.token, refresh: this.tokens.refresh })
    },
    auth_request() {
      this.status = 'loading'
    },
    auth_success(payload) {
      this.status = 'success'
      this.tokens.token = payload.token
      this.tokens.refresh = payload.refresh
    },
    auth_error() {
      this.status = 'error'
    },
    logout() {
      this.status = ''
      this.tokens.token = ''
      this.tokens.refresh = ''
    }
  }
})
