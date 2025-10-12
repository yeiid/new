import React from 'react';
import MapaRed from '../components/MapaRed';

const Step = ({ number, title, description }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
            {number}
        </div>
        <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
        </div>
    </div>
);

function ComoFunciona() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">¿Cómo Funciona la Red Mesh?</h1>
                <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">Nuestra red no depende de internet. Es un sistema local, robusto y diseñado para las condiciones de La Guajira. A continuación, te explicamos el viaje que hacen los datos para llegar a ti.</p>

                <MapaRed />

                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Un Ejemplo Histórico: El Inicio de Internet y ARPANET</h2>
                    <p className="text-lg text-center text-gray-600 max-w-4xl mx-auto">El internet moderno comenzó con ARPANET en 1969, una red experimental de cuatro computadoras en universidades de EE.UU. conectadas para compartir información de manera distribuida y resistente a fallos. Similarmente, Guajira Mesh crea una red local robusta para compartir conocimiento y energía renovable en La Guajira, adaptada a las necesidades de la comunidad.</p>
                </div>

                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">El Viaje de los Datos</h2>
                <Step 
                    number="1"
                    title="El Servidor Central: El Corazón de la Red"
                    description="Todo comienza en un servidor local (un mini-PC). Aquí almacenamos contenido previamente verificado: películas, libros de la biblioteca virtual, cursos y noticias locales. Una IA ligera ayuda a clasificar y asegurar que la información sea confiable."
                />
                <Step 
                    number="2"
                    title="El Backhaul Cableado: La Autopista de Datos"
                    description="Desde el servidor, los datos viajan a través de una 'autopista' de cable de alta velocidad. Este es el backhaul, la espina dorsal de la red. Al ser cableada, es inmune a interferencias y garantiza una conexión súper estable y rápida entre los puntos principales."
                />
                <Step 
                    number="3"
                    title="Puntos de Acceso (AP): Los Faros de la Comunidad"
                    description="El cableado llega a varios Puntos de Acceso (APs) estratégicamente ubicados en la comunidad. Estos APs, alimentados por paneles solares, actúan como faros, convirtiendo los datos del cable en una señal Wi-Fi potente y de largo alcance."
                />
                <Step 
                    number="4"
                    title="El Usuario Final: Conexión Directa al Conocimiento"
                    description="Finalmente, cualquier persona en el rango de un AP puede conectarse a la red Wi-Fi 'Papayal Mesh' desde su celular, tablet o computador. Al conectarse, acceden a todo el contenido del servidor de forma gratuita, rápida y segura, como si tuvieran internet, pero sin necesitarlo."
                />
            </div>
            </div>
        </div>
    );
}

export default ComoFunciona;