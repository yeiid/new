import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors">Guajira Mesh</Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/como-funciona" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">¿Cómo Funciona?</Link>
                            <Link to="/por-que" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">¿Por Qué?</Link>
                            <Link to="/para-que" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">¿Para Qué?</Link>
                            <Link to="/foro" className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-md text-sm font-medium">Foro de Opiniones</Link>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/como-funciona" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">¿Cómo Funciona?</Link>
                    <Link to="/por-que" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">¿Por Qué?</Link>
                    <Link to="/para-que" className="hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">¿Para Qué?</Link>
                    <Link to="/foro" className="bg-cyan-500 hover:bg-cyan-600 text-white block px-3 py-2 rounded-md text-base font-medium">Foro de Opiniones</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;