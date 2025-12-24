import api from './api'

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  async validateToken(token) {
    try {
      const response = await api.get('/auth/validate', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.data && response.data.user) {
        return response.data.user
      }
      throw new Error('Invalid response from server')
    } catch (error) {
      console.error('Token validation error:', error)
      throw error
    }
  },

  async logout() {
    await api.post('/auth/logout')
  },
}
