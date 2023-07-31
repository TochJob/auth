const API = 'https://poker.evenbetpoker.com/api/web/'

export default {
  /**
   * Login api
   */
  apiAuthLogin: `${API}v2/login`,
  apiRefreshTokens: `${API}auth/token?clientId=default`,

  /**
   * User's data
   */
  apiGetUserBalance: `${API}v2/users/me/balance?clientId=default`,
  /**
   * Games api
   */
  apiGetGames: `${API}/v2/casino/games?clientId=default`,
  apiGetGameLink: `${API}/v2/casino/games`
}
