import { useState, useEffect } from 'react'
import { infoService } from '../../services/infoService'
import { Info as InfoIcon, FileText, Calendar, Wifi, Shield, HelpCircle, Book } from 'lucide-react'

const Info = () => {
  const [infoItems, setInfoItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('general')

  useEffect(() => {
    loadInfo()
  }, [])

  const loadInfo = async () => {
    try {
      const data = await infoService.getInfo()
      setInfoItems(data)
    } catch (error) {
      console.error('Error loading info:', error)
    } finally {
      setLoading(false)
    }
  }

  const staticInfo = {
    general: [
      {
        title: 'Sobre Guajira Mesh',
        description: 'Una red comunitaria descentralizada diseñada para conectar a las comunidades de la Guajira, permitiendo el intercambio libre de información y comunicación sin depender de internet global.',
        icon: Wifi
      },
      {
        title: 'Nuestros Principios',
        description: 'Nos basamos en la solidaridad, la privacidad y la neutralidad de la red. Cada nodo fortalece la estructura y amplía la cobertura para todos.',
        icon: Shield
      }
    ],
    guides: [
      {
        title: 'Cómo Conectarse',
        description: 'Guía paso a paso para configurar tu nodo y unirte a la red mesh. Requisitos de hardware y configuración de software.',
        icon: Book
      },
      {
        title: 'Mantenimiento del Nodo',
        description: 'Buenas prácticas para mantener tu nodo activo y saludable, contribuyendo a la estabilidad de la red.',
        icon: FileText
      }
    ],
    faq: [
      {
        title: '¿Necesito Internet?',
        description: 'No. Guajira Mesh funciona independientemente de Internet. Es una intranet comunitaria.',
        icon: HelpCircle
      },
      {
        title: '¿Es seguro?',
        description: 'El tráfico está encriptado, pero al ser una red abierta, recomendamos usar HTTPS y servicios seguros dentro de la red.',
        icon: Shield
      }
    ]
  }

  const renderStaticSection = (items) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'guides', label: 'Guías' },
    { id: 'faq', label: 'Preguntas Frecuentes' },
    { id: 'news', label: 'Noticias y Recursos' }
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Información y Ayuda</h1>

        <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'general' && renderStaticSection(staticInfo.general)}
        {activeTab === 'guides' && renderStaticSection(staticInfo.guides)}
        {activeTab === 'faq' && renderStaticSection(staticInfo.faq)}

        {activeTab === 'news' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoItems.length === 0 ? (
              <div className="col-span-2 bg-white rounded-lg shadow-sm p-12 text-center">
                <InfoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay noticias recientes
                </h3>
                <p className="text-gray-600">Mantente atento a las actualizaciones de la red.</p>
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
        )}
      </div>
    </div>
  )
}

export default Info
