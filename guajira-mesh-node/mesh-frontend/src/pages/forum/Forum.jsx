import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { forumService } from '../../services/forumService'
import { Plus, MessageSquare, User, Calendar } from 'lucide-react'

const Forum = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const data = await forumService.getPosts()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Foro de Discusión</h1>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Nueva Publicación</span>
        </button>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay publicaciones aún
            </h3>
            <p className="text-gray-600">Sé el primero en crear una publicación</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              to={`/forum/${post.id}`}
              className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{post.author?.name || 'Usuario'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare size={16} />
                  <span>{post.commentsCount || 0} comentarios</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default Forum
