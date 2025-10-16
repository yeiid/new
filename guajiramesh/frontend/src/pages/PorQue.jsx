import React from 'react';

function PorQue() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">¿Por Qué lo Hacemos? La Raíz del Problema</h1>
                <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">Guajira Mesh nace de una necesidad urgente en La Guajira: la lucha contra el aislamiento y la desinformación en una de las regiones más vulnerables y desconectadas de Colombia.</p>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">La Brecha Digital y el Aislamiento</h3>
                    <p className="text-gray-700">En muchas comunidades de La Guajira, el acceso a internet es limitado o inexistente. Esta falta de conexión no solo restringe las oportunidades educativas y económicas, sino que también crea un vacío de información que es peligrosamente fácil de llenar con datos falsos o malintencionados.</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">La Desinformación como Arma</h3>
                    <p className="text-gray-700">Cuando la información es escasa, los rumores y las noticias falsas (a menudo impulsados por IA y distribuidos por WhatsApp) se propagan sin control. Esto puede generar conflictos sociales, afectar la salud pública (con curas falsas o desinformación sobre vacunas) y manipular decisiones importantes de la comunidad.</p>
                </div>

                <blockquote className="bg-cyan-50 border-l-4 border-cyan-500 p-6 my-8 italic">
                    <p className="text-gray-800">"Cuando no tienes cómo verificar lo que te cuentan, la mentira más repetida se convierte en tu verdad. Eso es un peligro para todos."</p>
                    <footer className="text-right text-gray-600 mt-4">- Líder Comunitario de La Guajira</footer>
                </blockquote>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Nuestra Misión: Soberanía Informativa</h3>
                    <p className="text-gray-700">No se trata solo de dar conexión, sino de entregar el control de la información a la propia comunidad. Al crear una red local con contenido verificado por líderes locales, empoderamos a las personas para que puedan tomar decisiones informadas, proteger su cultura y construir un futuro más seguro y conectado desde adentro.</p>
                </div>
            </div>
        </div>
    );
}

export default PorQue;