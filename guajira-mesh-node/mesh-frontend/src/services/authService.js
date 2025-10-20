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
    const response = await api.get('/auth/validate', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  },

  async logout() {
    await api.post('/auth/logout')
  },
}
