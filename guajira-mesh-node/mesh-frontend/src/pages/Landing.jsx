import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MessageSquare, Info, Users, Shield, ArrowRight, CheckCircle, Wifi } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const Landing = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard')
    }
  }, [user, loading, navigate])

  const features = [
    {
      icon: MessageSquare,
      title: 'Foro Comunitario',
      description: 'Participa en discusiones, comparte ideas y conecta con otros miembros de la comunidad.',
    },
    {
      icon: Info,
      title: 'Centro de Información',
      description: 'Accede a recursos, documentos y contenido educativo importante para la comunidad.',
    },
    {
      icon: Shield,
      title: 'Gestión Administrativa',
      description: 'Panel de control para administradores con herramientas de gestión completas.',
    },
  ]

  const benefits = [
    'Comunicación descentralizada',
    'Acceso a información local',
    'Colaboración comunitaria',
    'Gestión eficiente de recursos',
    'Disponible 24/7',
    'Fácil de usar',
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">Guajira Mesh</span>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 font-medium transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium transition-all shadow-sm"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Wifi className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Red Comunitaria Descentralizada</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Bienvenido a <span className="text-blue-200">Guajira Mesh</span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Plataforma de comunicación y gestión de información diseñada para conectar y empoderar comunidades
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center space-x-2 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg text-lg"
              >
                <span>Comenzar Ahora</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center space-x-2 bg-blue-500/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-500/30 transition-colors backdrop-blur-sm border border-white/20 text-lg"
              >
                <span>Iniciar Sesión</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Herramientas para tu Comunidad
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Todo lo que necesitas para comunicarte, colaborar y gestionar información en un solo lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                ¿Por qué elegir Guajira Mesh?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Una plataforma diseñada específicamente para las necesidades de comunicación y gestión de información en comunidades locales.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6">Únete a la Red</h3>
              <p className="text-blue-100 mb-8 text-lg">
                Regístrate hoy y comienza a formar parte de una comunidad conectada y colaborativa.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                <span>Crear Cuenta Gratis</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a Guajira Mesh y descubre una nueva forma de conectar con tu comunidad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg text-lg"
            >
              <span>Registrarse Ahora</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center space-x-2 bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-lg"
            >
              <span>Ya tengo cuenta</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <span className="font-bold text-lg">Guajira Mesh</span>
            </div>
            <div className="text-gray-400 text-sm text-center md:text-right">
              <p>© 2025 Guajira Mesh. Red comunitaria de información y comunicación.</p>
              <p className="mt-1">Conectando comunidades, compartiendo conocimiento.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
