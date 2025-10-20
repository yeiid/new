# Estructura del Proyecto Frontend - Guajira Mesh

## 📁 Estructura de Carpetas

```
mesh-frontend/
├── public/              # Archivos estáticos
│   └── vite.svg        # Logo de Vite
├── src/
│   ├── components/     # Componentes reutilizables
│   │   ├── auth/       # Componentes de autenticación
│   │   ├── forum/      # Componentes del foro
│   │   ├── admin/      # Componentes administrativos
│   │   ├── common/     # Componentes comunes
│   │   └── layout/     # Layouts principales
│   │       ├── MainLayout.jsx      # Layout principal del sitio
│   │       └── AdminLayout.jsx     # Layout del panel admin
│   ├── pages/          # Páginas de la aplicación
│   │   ├── auth/       # Páginas de autenticación
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── forum/      # Páginas del foro
│   │   │   ├── Forum.jsx
│   │   │   └── ForumPost.jsx
│   │   ├── admin/      # Páginas de administración
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── AdminForum.jsx
│   │   │   └── AdminInfo.jsx
│   │   ├── info/       # Páginas de información
│   │   │   └── Info.jsx
│   │   └── Home.jsx    # Página de inicio
│   ├── context/        # Contextos de React
│   │   └── AuthContext.jsx  # Contexto de autenticación
│   ├── services/       # Servicios de API
│   │   ├── api.js              # Configuración de Axios
│   │   ├── authService.js      # Servicios de autenticación
│   │   ├── forumService.js     # Servicios del foro
│   │   └── infoService.js      # Servicios de información
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utilidades
│   ├── styles/         # Estilos adicionales
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── .env                # Variables de entorno (no versionado)
├── .env.example        # Ejemplo de variables de entorno
├── package.json        # Dependencias del proyecto
├── vite.config.js      # Configuración de Vite
├── tailwind.config.js  # Configuración de TailwindCSS
└── postcss.config.js   # Configuración de PostCSS

```

## 🎨 Sistema de Diseño

### Colores Principales
- **Primario**: Azul (#2563eb - blue-600)
- **Secundario**: Índigo (#4f46e5 - indigo-600)
- **Éxito**: Verde (#16a34a - green-600)
- **Peligro**: Rojo (#dc2626 - red-600)
- **Advertencia**: Amarillo (#eab308 - yellow-500)

### Tipografía
- **Fuente**: Inter, sistema sans-serif
- **Tamaños**: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl

### Espaciado
- **Pequeño**: 0.5rem (2), 1rem (4)
- **Mediano**: 1.5rem (6), 2rem (8)
- **Grande**: 3rem (12), 4rem (16)

## 🛣️ Rutas de la Aplicación

### Rutas Públicas
- `/login` - Página de inicio de sesión
- `/register` - Página de registro

### Rutas Protegidas (Requieren autenticación)
- `/` - Página de inicio
- `/forum` - Lista de publicaciones del foro
- `/forum/:postId` - Detalle de publicación
- `/info` - Centro de información

### Rutas de Administración (Requieren rol admin)
- `/admin` - Dashboard administrativo
- `/admin/users` - Gestión de usuarios
- `/admin/forum` - Gestión del foro
- `/admin/info` - Gestión de información

## 🔐 Sistema de Autenticación

### Flujo de Autenticación
1. Usuario ingresa credenciales en `/login` o `/register`
2. Se envía petición al backend `/api/auth/login` o `/api/auth/register`
3. Backend responde con token JWT y datos del usuario
4. Token se guarda en `localStorage`
5. Usuario es redirigido a la página principal
6. El token se incluye en todas las peticiones subsiguientes

### Protección de Rutas
- `ProtectedRoute`: Componente que verifica autenticación
- `adminOnly`: Prop para rutas que requieren rol de administrador
- Redirección automática a `/login` si no está autenticado

## 📡 Servicios de API

### Configuración Base (api.js)
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
```

### Interceptores
- **Request**: Agrega token de autenticación a headers
- **Response**: Maneja errores 401 (no autorizado)

### Servicios Disponibles
- **authService**: login, register, validateToken, logout
- **forumService**: getPosts, getPost, createPost, updatePost, deletePost, createComment
- **infoService**: getInfo, getInfoById, createInfo, updateInfo, deleteInfo

## 🎯 Componentes Principales

### MainLayout
- Navbar responsive con menú móvil
- Navegación activa
- Perfil de usuario
- Botón de logout
- Footer

### AdminLayout
- Sidebar colapsable
- Navegación administrativa
- Información del usuario
- Breadcrumbs automáticos

### AuthContext
- Gestión global del estado de autenticación
- Funciones: login, register, logout
- Estado: user, loading

## 🚀 Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview

# Linting
npm run lint
```

## 🔧 Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
```

## 📦 Dependencias Principales

- **react**: ^19.1.1
- **react-dom**: ^19.1.1
- **react-router-dom**: ^7.9.4
- **axios**: Peticiones HTTP
- **lucide-react**: Iconos
- **tailwindcss**: ^4.1.14
- **vite**: ^7.1.7

## 🎨 Clases CSS Personalizadas

### Botones
- `.btn-primary` - Botón primario azul
- `.btn-secondary` - Botón secundario gris
- `.btn-danger` - Botón de peligro rojo

### Inputs
- `.input-field` - Campo de entrada estándar

### Cards
- `.card` - Tarjeta básica
- `.card-hover` - Tarjeta con efecto hover

### Animaciones
- `.fade-in` - Animación de entrada con fade
- `.custom-scrollbar` - Scrollbar personalizado

## 📱 Responsive Design

El diseño es completamente responsive con breakpoints:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🔄 Estado de Carga

Todos los componentes que hacen peticiones HTTP muestran:
- Spinner de carga durante la petición
- Mensaje de error si falla
- Contenido cuando se completa exitosamente

## 🎯 Próximos Pasos

1. Conectar con el backend real
2. Implementar paginación en listas
3. Agregar búsqueda y filtros
4. Implementar notificaciones en tiempo real
5. Agregar sistema de roles más granular
6. Implementar caché de datos
7. Agregar tests unitarios y de integración
