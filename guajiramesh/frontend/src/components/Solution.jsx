import React, { useState } from 'react';

const nodesData = [
    {
        id: 'server',
        name: 'Servidor Central',
        cost: '$500.000',
        description: 'El cerebro de la red. Un mini-computador (como Raspberry Pi) que almacena contenido verificado, películas, y la biblioteca virtual. Aquí se ejecuta la IA para filtrar desinformación.'
    },
    {
        id: 'backhaul',
        name: 'Backhaul Cableado',
        cost: 'Costo variable',
        description: 'La espina dorsal de la red. Usamos cableado de alta velocidad para conectar los puntos de acceso principales, garantizando una conexión estable y rápida, sin depender de internet.'
    },
    {
        id: 'ap',
        name: 'Nodo AP Exterior',
        cost: '$750.000',
        description: 'Puntos de Acceso (AP) que distribuyen la señal en un área amplia. Son alimentados por energía solar para funcionar 24/7 y llevar la conexión a los hogares y espacios comunes.'
    },
    {
        id: 'user',
        name: 'Usuario Final',
        cost: 'Acceso Gratuito',
        description: 'Miembros de las comunidades guajiras conectándose desde sus teléfonos, tabletas o computadores para acceder a información, educación y entretenimiento de forma segura y gratuita.'
    }
];

function Solution() {
    const [selectedNode, setSelectedNode] = useState(nodesData[0]);

    return (
        <section id="solution" className="bg-gray-50 py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">La Solución: Arquitectura Mesh y Contenido Local</h2>
                    <p className="mt-4 text-lg text-gray-600">Un ecosistema tecnológico diseñado para ser robusto, autónomo y sostenible.</p>
                </div>

                <div className="mt-12 lg:grid lg:grid-cols-3 lg:gap-8 items-start">
                    {/* Columna de Nodos */}
                    <div className="flex flex-col items-center space-y-4 lg:col-span-1">
                        {nodesData.map((node) => (
                            <button 
                                key={node.id} 
                                onClick={() => setSelectedNode(node)}
                                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${selectedNode.id === node.id ? 'bg-cyan-500 text-white shadow-lg scale-105' : 'bg-white hover:bg-gray-100'}`}>
                                <p className="font-bold">{node.name}</p>
                            </button>
                        ))}
                    </div>

                    {/* Panel de Información */}
                    <div className="mt-10 lg:mt-0 lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-cyan-800">{selectedNode.name}</h3>
                        <p className="text-sm font-semibold text-gray-500 mt-1">Costo Aproximado: {selectedNode.cost}</p>
                        <p className="mt-4 text-gray-700 leading-relaxed">{selectedNode.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Solution;