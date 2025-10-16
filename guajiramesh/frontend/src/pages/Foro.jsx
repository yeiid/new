import React, { useState } from 'react';

const initialOpinions = [
    {
        id: 1,
        name: 'Líder Comunitario',
        opinion: 'Esta red es una ventana de esperanza. Nos permite proteger a nuestros jóvenes de la desinformación y darles acceso a la educación que merecen.',
        date: 'hace 2 días'
    },
    {
        id: 2,
        name: 'Estudiante de Bachillerato',
        opinion: 'Poder consultar libros para mis tareas sin depender de si hay internet o no es increíble. ¡Y las noches de cine son lo mejor!',
        date: 'hace 1 día'
    }
];

function Foro() {
    const [opinions, setOpinions] = useState(initialOpinions);
    const [newOpinion, setNewOpinion] = useState({ name: '', opinion: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewOpinion(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newOpinion.name && newOpinion.opinion) {
            const newEntry = {
                id: opinions.length + 1,
                ...newOpinion,
                date: 'justo ahora'
            };
            setOpinions([newEntry, ...opinions]);
            setNewOpinion({ name: '', opinion: '' }); // Limpiar formulario
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Foro de Opiniones</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Tu voz es importante. Comparte tus ideas y testimonios sobre el proyecto Guajira Mesh.</p>
                </div>

                {/* Formulario para nueva opinión */}
                <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Deja tu Opinión</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tu Nombre</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                                value={newOpinion.name}
                                onChange={handleChange}
                                placeholder="Ej: María P."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="opinion" className="block text-sm font-medium text-gray-700">Tu Opinión</label>
                            <textarea
                                name="opinion"
                                id="opinion"
                                rows="4"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                                value={newOpinion.opinion}
                                onChange={handleChange}
                                placeholder="¿Qué piensas del proyecto?"
                                required
                            ></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                                Enviar Opinión
                            </button>
                        </div>
                    </form>
                </div>

                {/* Lista de Opiniones */}
                <div className="mt-12 space-y-8">
                    {opinions.map(item => (
                        <div key={item.id} className="bg-white p-6 rounded-xl shadow-md">
                            <p className="text-gray-800 italic">"{item.opinion}"</p>
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm font-bold text-cyan-700">- {item.name}</p>
                                <p className="text-xs text-gray-500">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Foro;