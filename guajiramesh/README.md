# Guajira Mesh

## Descripción

Guajira Mesh es una plataforma web innovadora diseñada para llevar información confiable, educación y entretenimiento a la comunidad Wayuu en La Guajira, Colombia. Utilizando una arquitectura de red mesh alimentada por energías renovables, el proyecto combate la desinformación generada por IA y promueve el desarrollo sostenible en áreas remotas.

El proyecto consta de una aplicación web con frontend en React y backend en Express, que incluye funcionalidades para donaciones, información sobre la red mesh y verificación de noticias comunitarias.

## Características

- **Red Mesh Comunitaria**: Arquitectura de red descentralizada para áreas sin acceso a internet confiable.
- **Energías Renovables**: Nodos alimentados por paneles solares para operación 24/7.
- **Verificación de Información**: Portal local para noticias verificadas por líderes comunitarios.
- **Entretenimiento Comunitario**: Multi-streaming para "Noches de Cine" y eventos culturales.
- **Biblioteca Virtual Offline**: Acceso a libros, cursos y recursos educativos sin conexión a internet.
- **Sistema de Donaciones**: Plataforma para apoyar el financiamiento del proyecto.
- **Oportunidades Educativas**: Talleres para jóvenes en mantenimiento de hardware y gestión de redes.

## Tecnologías Utilizadas

### Frontend
- **React 19**: Framework para la interfaz de usuario.
- **Vite**: Herramienta de desarrollo rápida.
- **Tailwind CSS**: Framework de estilos utilitarios.
- **React Router**: Enrutamiento de páginas.

### Backend
- **Express.js**: Framework web para Node.js.
- **Node.js**: Entorno de ejecución JavaScript.

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación del Backend
1. Navega al directorio del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   node app.js
   ```
   El servidor se ejecutará en `http://localhost:3000`.

### Instalación del Frontend
1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`.

### Construcción para Producción
Para el frontend:
```bash
npm run build
```

## Uso

- Accede a la aplicación web en el navegador.
- Explora las secciones sobre el problema, la solución y la sostenibilidad.
- Realiza donaciones a través del formulario integrado.
- Consulta información sobre la red mesh y sus beneficios.

## Estructura del Proyecto

```
guajira-mesh/
├── backend/
│   ├── app.js
│   ├── package.json
│   └── public/
│       ├── css/
│       ├── images/
│       └── js/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y commits (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia ISC.

## Contacto

Para más información o preguntas, contacta al equipo de desarrollo.

---

*Guajira Mesh - Conectando comunidades, combatiendo la desinformación.*
