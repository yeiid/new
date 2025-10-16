import React from 'react';

const Feature = ({ title, description, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-700">{description}</p>
    </div>
);

function ParaQue() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">¿Para Qué Sirve la Red?</h1>
                <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">Más que solo conexión, Guajira Mesh es una plataforma para el desarrollo, la educación y el entretenimiento de la comunidad. Estos son algunos de sus usos prácticos:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Feature 
                    icon="🎬"
                    title="Multi-Streaming para Noches de Cine"
                    description="Gracias a la tecnología de multidifusión (multicast), podemos transmitir una película en alta definición desde el servidor central y que docenas de personas la vean al mismo tiempo en diferentes lugares (hogares, plazas) sin que la red se sature. Cada usuario recibe la misma señal, optimizando el ancho de banda al máximo."
                />
                <Feature 
                    icon="🎓"
                    title="Oportunidades para Estudiantes"
                    description="Los jóvenes bachilleres y estudiantes universitarios de la comunidad son clave. Pueden unirse al proyecto para aprender sobre redes, mantenimiento de hardware (paneles solares, APs) y gestión de contenido. Ofrecemos talleres prácticos y la oportunidad de convertirse en los futuros administradores de la red."
                />
                <Feature 
                    icon="📚"
                    title="Biblioteca Virtual Offline"
                    description="Acceso instantáneo a una vasta colección de libros, enciclopedias, manuales y cursos en video sin necesidad de una conexión a internet. Un recurso invaluable para estudiantes y cualquier persona con ganas de aprender."
                />
                 <Feature 
                    icon="✅"
                    title="Verificación de Noticias y Trámites"
                    description="Un portal local para consultar noticias verificadas por líderes comunitarios y acceder a versiones digitales de trámites de la población guajira, reduciendo la necesidad de desplazamientos y combatiendo la desinformación."
                />
                </div>
            </div>
        </div>
    );
}

export default ParaQue;