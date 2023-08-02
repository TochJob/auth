import { defineStore } from 'pinia'
import apiConfig from '../apiConfig/api.config'
import axios from 'axios'

const { apiGetUserBalance } = apiConfig

export const useUserStore = defineStore('user', {
  state: () => ({
    balance: 0
  }),
  actions: {
    async getUserBalance() {
      const token = localStorage.getItem('token')
      console.log('getUserBalance', localStorage)
      console.log(token)
      try {
        const response = await axios.get(`${apiGetUserBalance}&auth=${token}`)
        this.balance = response.data.data
      } catch (error) {
        console.log(error)
      }
    }
  }
})
