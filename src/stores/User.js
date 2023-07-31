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
      try {
        const response = await axios.get(`${apiGetUserBalance}&auth=${token}`)
        this.balance = response.data
        console.log(this.balance)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
