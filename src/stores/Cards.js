import { defineStore } from 'pinia'
import apiConfig from '../apiConfig/api.config'
import axios from 'axios'

const { apiGetGames, apiGetGameLink } = apiConfig

export const useGamesStore = defineStore('games', {
  state: () => ({
    games: []
  }),
  actions: {
    async getGames() {
      try {
        const response = await axios.get(apiGetGames)
        console.log(response)
        this.games = response.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async getGameLink(gameId) {
      const data = {
        clientId: 'default',
        gameId: gameId
      }
      console.log(data)
      try {
        const response = await axios.post(
          `${apiGetGameLink}/${gameId}/session-demo?clientId=default`,
          data
        )
        window.open(response.data.data[0].attributes['launch-options']['game-url'])
      } catch (error) {
        console.log(error)
      }
    }
  }
})
