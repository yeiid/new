import api from './api'

export const forumService = {
  async getPosts(page = 1, limit = 10) {
    const response = await api.get(`/forum/posts?page=${page}&limit=${limit}`)
    return response.data
  },

  async getPost(postId) {
    const response = await api.get(`/forum/posts/${postId}`)
    return response.data
  },

  async createPost(postData) {
    const response = await api.post('/forum/posts', postData)
    return response.data
  },

  async updatePost(postId, postData) {
    const response = await api.put(`/forum/posts/${postId}`, postData)
    return response.data
  },

  async deletePost(postId) {
    const response = await api.delete(`/forum/posts/${postId}`)
    return response.data
  },

  async createComment(postId, content) {
    const response = await api.post(`/forum/posts/${postId}/comments`, { content })
    return response.data
  },

  async deleteComment(postId, commentId) {
    const response = await api.delete(`/forum/posts/${postId}/comments/${commentId}`)
    return response.data
  },
}
