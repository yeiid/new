import { Users, MessageSquare, FileText, TrendingUp } from 'lucide-react'

const AdminDashboard = () => {
  const stats = [
    { name: 'Usuarios Totales', value: '0', icon: Users, color: 'blue' },
    { name: 'Publicaciones', value: '0', icon: MessageSquare, color: 'green' },
    { name: 'Recursos de Info', value: '0', icon: FileText, color: 'purple' },
    { name: 'Actividad Hoy', value: '0', icon: TrendingUp, color: 'orange' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Vista general del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Actividad Reciente</h2>
        <div className="text-center py-12 text-gray-500">
          <p>No hay actividad reciente</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
