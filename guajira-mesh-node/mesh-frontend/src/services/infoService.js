import api from './api'

export const infoService = {
  async getInfo() {
    const response = await api.get('/info')
    return response.data
  },

  async getInfoById(id) {
    const response = await api.get(`/info/${id}`)
    return response.data
  },

  async createInfo(infoData) {
    const response = await api.post('/info', infoData)
    return response.data
  },

  async updateInfo(id, infoData) {
    const response = await api.put(`/info/${id}`, infoData)
    return response.data
  },

  async deleteInfo(id) {
    const response = await api.delete(`/info/${id}`)
    return response.data
  },
}
