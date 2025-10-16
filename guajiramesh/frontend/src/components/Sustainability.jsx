import React from 'react';

function Sustainability() {
    return (
        <section id="sustainability" className="bg-gray-900 text-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold sm:text-4xl text-cyan-300">Sostenibilidad con Energías Renovables</h2>
                <p className="mt-4 text-lg text-gray-300">Nuestra red funciona 24/7 gracias al poder del sol.</p>
                <div className="mt-10">
                    <img src="/paneles.png" alt="Panel Solar alimentando un nodo de la red" className="mx-auto h-48 w-auto" />
                </div>
            </div>
        </section>
    );
}

export default Sustainability;