const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos (HTML, CSS, JS, imágenes)
app.use(express.static('public'));
app.use(express.json()); // Para manejar datos JSON en solicitudes POST

// Ruta principal: sirve el index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// API para Donaciones (Simulada):
// Recibe datos del formulario y simula una transacción/registro
app.post('/api/donate', (req, res) => {
    const { amount, contact } = req.body;
    // Lógica: Aquí se registraría al donante en una base de datos real
    console.log(`Donación recibida: $${amount} de ${contact}`);

    // Respuesta simple al frontend para la UI
    res.json({ 
        success: true, 
        message: `¡Gracias por tu donación de $${amount}! Nos pondremos en contacto.` 
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de Guajira Mesh corriendo en http://localhost:${PORT}`);
});