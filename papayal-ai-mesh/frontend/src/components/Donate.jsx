import React, { useState } from 'react';

function Donate() {
    const [formData, setFormData] = useState({ amount: '', contact: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica de envío al backend (simulada)
        setMessage(`¡Gracias por tu donación de $${formData.amount}! Nos pondremos en contacto.`);
        setIsSubmitted(true);
    };

    return (
        <section id="donate" className="bg-gray-100 py-16 sm:py-24">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Tu Aporte Transforma la Guajira</h2>
                    <p className="mt-4 text-lg text-gray-600">Cada contribución nos acerca más a conectar la próxima comunidad.</p>
                </div>

                <div className="mt-12">
                    {isSubmitted ? (
                        <div className="text-center bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
                            <p className="font-bold">¡Donación Exitosa!</p>
                            <p>{message}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto (COP)</label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                                        placeholder="50000"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Email o WhatsApp</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="contact"
                                        id="contact"
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                                        placeholder="tu@email.com"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors">
                                    Donar Ahora
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Donate;