import { useState, useEffect } from 'react'
import { forumService } from '../services/forumService'
import { useAuth } from '../hooks/useAuth'
import { User, Mail, Shield, MessageSquare, Calendar, Clock, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

const Profile = () => {
    const { user, logout } = useAuth()
    const [userPosts, setUserPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            loadUserPosts()
        }
    }, [user])

    const loadUserPosts = async () => {
        try {
            const data = await forumService.getPosts()
            // Filter posts by current user since backend doesn't have a specific endpoint yet
            // In a real app, we should add an endpoint like /api/users/me/posts
            const myPosts = (Array.isArray(data) ? data : data.posts || []).filter(
                post => post.author_id === user.id
            )
            setUserPosts(myPosts)
        } catch (error) {
            console.error('Error loading user posts:', error)
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
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end space-x-6">
                            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500">
                                    {(user?.name || user?.email)?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="pb-1">
                                <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                                <p className="text-gray-600">{user?.role === 'admin' ? 'Administrador' : 'Miembro de la Comunidad'}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center space-x-2 px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={20} />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                        <div className="flex items-center space-x-3 text-gray-600">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <Shield className="w-5 h-5 text-gray-400" />
                            <span>ID: {user?.id}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Posts Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                    <span>Mis Publicaciones ({userPosts.length})</span>
                </h2>

                {userPosts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No has publicado nada aún
                        </h3>
                        <p className="text-gray-600 mb-6">Comparte tus ideas con la comunidad</p>
                        <Link
                            to="/dashboard/forum"
                            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <span>Ir al Foro</span>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {userPosts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/dashboard/forum/${post.id}`}
                                className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-2">{post.content}</p>

                                        <div className="flex items-center space-x-4 text-sm text-gray-500 pt-2">
                                            <div className="flex items-center space-x-1">
                                                <Calendar size={14} />
                                                <span>{new Date(post.created_at || post.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <MessageSquare size={14} />
                                                <span>{post.commentsCount || 0} comentarios</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile
