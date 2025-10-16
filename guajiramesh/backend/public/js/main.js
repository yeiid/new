document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica del Formulario de Donación
    const donationForm = document.getElementById('donation-form');
    const donationFormContainer = document.getElementById('donation-form-container');
    const thankYouMessage = document.getElementById('thank-you-message');

    if (donationForm) {
        donationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const amount = e.target.amount.value;
            const contact = e.target.contact.value;

            try {
                const response = await fetch('/api/donate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount, contact }),
                });

                const result = await response.json();

                if (result.success) {
                    // Ocultar formulario y mostrar mensaje de agradecimiento
                    donationFormContainer.classList.add('hidden');
                    thankYouMessage.textContent = result.message;
                    thankYouMessage.classList.remove('hidden');
                } else {
                    alert('Hubo un error con la donación. Por favor, inténtalo de nuevo.');
                }
            } catch (error) {
                console.error('Error al enviar donación:', error);
                alert('No se pudo conectar con el servidor. Revisa tu conexión.');
            }
        });
    }

    // 2. Interactividad del Diagrama Mesh
    const nodes = document.querySelectorAll('.node');

    nodes.forEach(node => {
        const info = node.getAttribute('data-info');
        let tooltip = null;

        node.addEventListener('mouseover', () => {
            if (!info) return;
            
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = info;
            node.appendChild(tooltip);

            // Forzar reflow para que la animación funcione
            void tooltip.offsetWidth;

            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        });

        node.addEventListener('mouseout', () => {
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                // Eliminar el tooltip del DOM después de la transición
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode === node) {
                        node.removeChild(tooltip);
                    }
                    tooltip = null;
                }, 300); // Coincide con la duración de la transición en CSS
            }
        });
    });

    // 3. UI Dinámica de Sostenibilidad
    const solarNode = document.querySelector('.solar-node');
    const powerText = document.querySelector('.power-text');

    if (solarNode && powerText) {
        solarNode.addEventListener('click', () => {
            if (powerText.style.display === 'block') {
                powerText.style.display = 'none';
            } else {
                powerText.style.display = 'block';
            }
        });
    }

    // 4. Animación de Carga/Inicio (Ejemplo)
    // Los títulos ya tienen animación CSS, pero aquí se podría añadir más lógica
    console.log('Guajira Mesh UI inicializada.');

});