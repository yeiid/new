import React from 'react';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import Sustainability from '../components/Sustainability';
import Donate from '../components/Donate';

function HomePage() {
    return (
        <>
            <Hero title="Guajira Mesh: Llevando Información Confiable y Energía a la Región." />
            <main>
                <Problem />
                <Solution />
                <Sustainability />
               <Donate />
            </main>
        </>
    );
}

export default HomePage;