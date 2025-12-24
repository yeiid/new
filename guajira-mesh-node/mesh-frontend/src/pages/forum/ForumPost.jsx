import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { forumService } from '../../services/forumService'
import { ArrowLeft, User, Calendar, Send } from 'lucide-react'

const ForumPost = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPost()
  }, [postId])

  const loadPost = async () => {
    try {
      const data = await forumService.getPost(postId)
      setPost(data)
    } catch (error) {
      console.error('Error loading post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      await forumService.createComment(postId, comment)
      setComment('')
      loadPost()
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Publicación no encontrada</h2>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/dashboard/forum')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        <span>Volver al foro</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-2">
            <User size={16} />
            <span>{post.author?.name || 'Usuario'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>{new Date(post.created_at || post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="prose max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Comentarios ({post.comments?.length || 0})
        </h2>

        <form onSubmit={handleSubmitComment} className="mb-8">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
            placeholder="Escribe un comentario..."
          />
          <button
            type="submit"
            className="mt-3 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Send size={18} />
            <span>Comentar</span>
          </button>
        </form>

        <div className="space-y-4">
          {post.comments?.map((comment) => (
            <div key={comment.id} className="border-l-4 border-gray-200 pl-4 py-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <User size={14} />
                <span className="font-medium">{comment.author?.name || 'Usuario'}</span>
                <span>•</span>
                <span>{new Date(comment.created_at || comment.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ForumPost
