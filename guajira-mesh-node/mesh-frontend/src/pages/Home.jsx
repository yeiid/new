import { useAuth } from '../context/AuthContext'
import { MessageSquare, Info, Users, TrendingUp, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Home = () => {
  const { user } = useAuth()

  const quickActions = [
    {
      to: '/dashboard/forum',
      title: 'Foro Comunitario',
      description: 'Participa en discusiones y comparte ideas',
      icon: MessageSquare,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      to: '/dashboard/info',
      title: 'Centro de Información',
      description: 'Consulta recursos y documentos importantes',
      icon: Info,
      color: 'green',
      gradient: 'from-green-500 to-green-600',
    },
    ...(user?.role === 'admin'
      ? [
          {
            to: '/admin',
            title: 'Panel de Administración',
            description: 'Gestiona usuarios, contenido y configuración',
            icon: Users,
            color: 'purple',
            gradient: 'from-purple-500 to-purple-600',
          },
        ]
      : []),
  ]

  const stats = [
    { label: 'Publicaciones', value: '0', icon: MessageSquare },
    { label: 'Usuarios Activos', value: '0', icon: Users },
    { label: 'Recursos', value: '0', icon: Info },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative px-6 py-12 sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              ¡Bienvenido, {user?.name?.split(' ')[0] || user?.email}!
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Explora el sistema de información y comunicación de Guajira Mesh
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/dashboard/forum"
                className="inline-flex items-center space-x-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                <span>Ir al Foro</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/dashboard/info"
                className="inline-flex items-center space-x-2 bg-blue-500/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500/30 transition-colors backdrop-blur-sm border border-white/20"
              >
                <span>Ver Información</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Icon className="w-8 h-8 text-gray-600" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Acceso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link
                key={index}
                to={action.to}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${action.gradient} rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {action.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                    <span>Explorar</span>
                    <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-50 rounded-lg flex-shrink-0">
            <Info className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Acerca de Guajira Mesh</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Guajira Mesh es una plataforma de comunicación y gestión de información diseñada
              para conectar comunidades. Aquí puedes participar en foros de discusión, acceder
              a información importante y colaborar con otros miembros de la red.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <TrendingUp size={16} className="text-green-600" />
                <span>Red en crecimiento</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock size={16} className="text-blue-600" />
                <span>Disponible 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
