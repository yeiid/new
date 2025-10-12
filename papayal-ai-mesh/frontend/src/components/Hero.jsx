import React from 'react';

function Hero() {
    return (
        <div className="relative bg-gray-800 text-white overflow-hidden">
            <div className="absolute inset-0">
                <img src="/fondo.jpg" alt="Fondo de La Guajira" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-cyan-300">
                    Guajira Mesh
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
                    Llevando Información Confiable y Energía a la Región. Empoderando a las comunidades contra la desinformación con tecnología local y renovable.
                </p>
                <div className="mt-10">
                    {/* Aquí podemos añadir un botón de llamada a la acción si queremos */}
                </div>
            </div>
        </div>
    );
}

export default Hero;