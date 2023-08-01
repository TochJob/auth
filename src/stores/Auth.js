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
        const tokens = response.data.data[0].attributes
        console.log('tokens',tokens);
        this.authorizationTokens(tokens.token, tokens['refresh-token'])
        return true
      } catch (error) {
        this.auth_error()
        this.logout()
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
      this.auth_success({ token: token, refresh: refresh })
    },
    auth_request() {
      this.status = 'loading'
    },
    auth_success(payload) {
      this.status = 'success'
      localStorage.setItem('token', payload.token)
      localStorage.setItem('refresh', payload.refresh)
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
    }
  }
})
