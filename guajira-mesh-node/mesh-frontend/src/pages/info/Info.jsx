import { useState, useEffect } from 'react'
import { infoService } from '../../services/infoService'
import { Info as InfoIcon, FileText, Calendar } from 'lucide-react'

const Info = () => {
  const [infoItems, setInfoItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInfo()
  }, [])

  const loadInfo = async () => {
    try {
      const data = await infoService.getInfo()
      setInfoItems(data.items || [])
    } catch (error) {
      console.error('Error loading info:', error)
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
      <h1 className="text-3xl font-bold text-gray-900">Información y Recursos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoItems.length === 0 ? (
          <div className="col-span-2 bg-white rounded-lg shadow-sm p-12 text-center">
            <InfoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay información disponible
            </h3>
            <p className="text-gray-600">Pronto habrá contenido disponible</p>
          </div>
        ) : (
          infoItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Info
