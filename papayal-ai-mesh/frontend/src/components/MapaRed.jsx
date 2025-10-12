import React from 'react';
import './MapaRed.css'; // Crearemos este archivo para los estilos del mapa

function MapaRed() {
    return (
        <div className="map-container">
            <h3>Visualización de la Red en el Terreno</h3>
            <svg viewBox="0 0 800 400" className="network-map">
                {/* Fondo del mapa */}
                <rect width="800" height="400" fill="#f0eada" />

                {/* Servidor Central */}
                <g className="node-group server-node">
                    <circle cx="100" cy="200" r="15" fill="#003366" />
                    <text x="100" y="230" textAnchor="middle">Servidor Central</text>
                </g>

                {/* Cableado Backhaul (Líneas) */}
                <path d="M 100 200 L 300 100" className="cable-line" />
                <path d="M 100 200 L 400 300" className="cable-line" />
                <path d="M 300 100 L 550 150" className="cable-line" />

                {/* Nodos AP (Puntos de Acceso) */}
                <g className="node-group ap-node">
                    <circle cx="300" cy="100" r="10" />
                    <circle cx="300" cy="100" r="80" className="wifi-signal" />
                    <text x="300" y="80" textAnchor="middle">AP 1</text>
                </g>
                <g className="node-group ap-node">
                    <circle cx="400" cy="300" r="10" />
                    <circle cx="400" cy="300" r="100" className="wifi-signal" />
                    <text x="400" y="280" textAnchor="middle">AP 2</text>
                </g>
                <g className="node-group ap-node">
                    <circle cx="550" cy="150" r="10" />
                    <circle cx="550" cy="150" r="90" className="wifi-signal" />
                    <text x="550" y="130" textAnchor="middle">AP 3</text>
                </g>
            </svg>
        </div>
    );
}

export default MapaRed;
