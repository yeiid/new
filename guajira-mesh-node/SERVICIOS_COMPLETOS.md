# 🌐 Guajira Mesh - Todos los Servicios Activos

## 📍 Información de Red
- **IP del Servidor:** `192.168.0.8`
- **Red WiFi:** ETB
- **Estado:** ✅ Todos los servicios activos

---

## 🚀 Servicios Disponibles

### 1. 🌐 **Frontend Web (React + Vite)**
- **Contenedor:** `mesh_web_server_dev`
- **Puertos:** 5173, 80
- **Estado:** ✅ Activo
- **Acceso Local:** http://localhost:5173 o http://localhost
- **Acceso en Red:** http://192.168.0.8:5173 o http://192.168.0.8
- **Descripción:** Interfaz web principal del sistema con landing page, dashboard, foro e información

**Características:**
- Landing page pública
- Sistema de registro y login
- Dashboard de usuario
- Foro comunitario
- Centro de información
- Panel de administración
- Diseño responsive y moderno

---

### 2. 🔌 **Backend API (Node.js + Express)**
- **Contenedor:** `mesh_backend_api`
- **Puerto:** 3000
- **Estado:** ✅ Activo
- **Acceso Local:** http://localhost:3000
- **Acceso en Red:** http://192.168.0.8:3000
- **Descripción:** API RESTful para gestión de usuarios, foro e información

**Endpoints principales:**
- `GET /api` - Estado de la API
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/validate` - Validación de token
- `GET /api/forum/posts` - Listar posts del foro
- `POST /api/forum/posts` - Crear post
- `POST /api/forum/posts/:id/comments` - Crear comentario
- `GET /api/info` - Listar recursos de información
- `POST /api/info` - Crear recurso (admin)

**Credenciales Admin:**
- Email: `admin@guajiramesh.local`
- Password: `admin123`

---

### 3. 🗄️ **Base de Datos (PostgreSQL)**
- **Contenedor:** `mesh_database`
- **Puerto:** 5432 (interno)
- **Estado:** ✅ Activo
- **Usuario:** user
- **Base de datos:** mydatabase
- **Descripción:** Base de datos relacional para almacenar todos los datos del sistema

**Tablas:**
- `users` - Usuarios del sistema
- `forum_posts` - Publicaciones del foro
- `comments` - Comentarios en posts
- `info_resources` - Recursos de información

**Conectarse:**
```bash
sudo docker exec -it mesh_database psql -U user -d mydatabase
```

---

### 4. 📚 **Biblioteca Digital de PDFs**
- **Contenedor:** `pdf_manager_service`
- **Puerto:** 5000
- **Estado:** ✅ Activo
- **Acceso Local:** http://localhost:5000
- **Acceso en Red:** http://192.168.0.8:5000
- **Descripción:** Gestor de biblioteca digital con visualización de PDFs

**Características:**
- Visualización de PDFs en el navegador
- Generación automática de miniaturas
- Búsqueda de documentos
- Descarga de archivos
- Organización por categorías
- Interfaz moderna y responsive

**Categorías disponibles (30+):**
- Álgebra y algoritmos
- Angular, React, Vue.js
- Backend, Frontend
- Bases de datos
- C, C++, C#
- CSS3, HTML5
- Data Science
- Docker
- Gaming
- Git
- Java, JavaScript
- Laravel, PHP
- MongoDB, NodeJS
- Python, R, Ruby
- SQL
- POO, Teoría de programación
- Web & UX UI
- Y más...

---

### 5. 🎬 **Servidor Multimedia (Jellyfin)**
- **Contenedor:** `mesh_media_server`
- **Puerto:** 8096
- **Estado:** ✅ Activo (iniciando)
- **Acceso Local:** http://localhost:8096
- **Acceso en Red:** http://192.168.0.8:8096
- **Descripción:** Servidor multimedia para películas, series, música y contenido educativo

**Características:**
- Streaming de video
- Biblioteca de películas
- Contenido educativo
- Música
- Transcodificación automática
- Apps para móviles y TV
- Gestión de usuarios
- Control parental

**Puertos adicionales:**
- 7359/udp - Descubrimiento de red
- 1900/udp - DLNA

**Carpetas de medios:**
- `/data/movies` - Películas
- `/data/educational` - Contenido educativo

**Primera configuración:**
1. Accede a http://192.168.0.8:8096
2. Sigue el asistente de configuración
3. Crea tu usuario administrador
4. Configura las bibliotecas de medios

---

### 6. 🐳 **Panel de Administración Docker (Portainer)**
- **Contenedor:** `mesh_admin_panel`
- **Puerto:** 9000
- **Estado:** ✅ Activo
- **Acceso Local:** http://localhost:9000
- **Acceso en Red:** http://192.168.0.8:9000
- **Descripción:** Interfaz web para gestionar todos los contenedores Docker

**Características:**
- Gestión visual de contenedores
- Ver logs en tiempo real
- Iniciar/detener/reiniciar servicios
- Ver estadísticas de recursos
- Gestión de volúmenes y redes
- Terminal web para contenedores
- Gestión de imágenes

**Primera configuración:**
1. Accede a http://192.168.0.8:9000
2. Crea tu contraseña de administrador
3. Selecciona "Local" para gestionar este servidor
4. ¡Listo! Podrás ver todos los contenedores

---

### 7. 📊 **Monitoreo del Sistema (Node Exporter)**
- **Contenedor:** `mesh_node_exporter`
- **Puerto:** 9100
- **Estado:** ✅ Activo
- **Acceso Local:** http://localhost:9100
- **Acceso en Red:** http://192.168.0.8:9100
- **Descripción:** Exportador de métricas del sistema para monitoreo

**Métricas disponibles:**
- Uso de CPU
- Uso de memoria RAM
- Uso de disco
- Tráfico de red
- Temperatura del sistema
- Procesos en ejecución
- Y más...

**Ver métricas:**
```bash
curl http://192.168.0.8:9100/metrics
```

**Integración:**
- Compatible con Prometheus
- Compatible con Grafana
- Formato estándar de métricas

---

## 🌐 Mapa Completo de Puertos

| Puerto | Servicio | Descripción |
|--------|----------|-------------|
| **80** | Frontend | Interfaz web principal |
| **5173** | Frontend Dev | Servidor de desarrollo Vite |
| **3000** | Backend API | API REST del sistema |
| **5000** | Biblioteca PDFs | Gestor de documentos |
| **5432** | PostgreSQL | Base de datos (interno) |
| **8096** | Jellyfin | Servidor multimedia |
| **9000** | Portainer | Panel Docker |
| **9100** | Node Exporter | Métricas del sistema |
| **7359/udp** | Jellyfin | Descubrimiento |
| **1900/udp** | Jellyfin | DLNA |

---

## 📱 Acceso desde Dispositivos

### Desde tu Computadora (Local)
```
Frontend:        http://localhost:5173
Backend:         http://localhost:3000
Biblioteca PDFs: http://localhost:5000
Jellyfin:        http://localhost:8096
Portainer:       http://localhost:9000
Métricas:        http://localhost:9100
```

### Desde Otros Dispositivos en la Red WiFi ETB
```
Frontend:        http://192.168.0.8:5173
Backend:         http://192.168.0.8:3000
Biblioteca PDFs: http://192.168.0.8:5000
Jellyfin:        http://192.168.0.8:8096
Portainer:       http://192.168.0.8:9000
Métricas:        http://192.168.0.8:9100
```

---

## 🛠️ Comandos Útiles

### Ver Estado de Todos los Servicios
```bash
sudo docker-compose ps
```

### Ver Logs de un Servicio
```bash
# Frontend
sudo docker-compose logs -f web

# Backend
sudo docker-compose logs -f backend

# Biblioteca PDFs
sudo docker-compose logs -f pdf-manager

# Jellyfin
sudo docker-compose logs -f jellyfin

# Portainer
sudo docker-compose logs -f portainer

# Todos los servicios
sudo docker-compose logs -f
```

### Reiniciar Servicios
```bash
# Reiniciar un servicio específico
sudo docker-compose restart web

# Reiniciar todos
sudo docker-compose restart
```

### Detener Servicios
```bash
# Detener un servicio
sudo docker-compose stop jellyfin

# Detener todos
sudo docker-compose down
```

### Iniciar Servicios
```bash
# Iniciar todos
sudo docker-compose up -d

# Iniciar servicios específicos
sudo docker-compose up -d web backend db
```

### Ver Recursos Utilizados
```bash
sudo docker stats
```

### Limpiar Sistema
```bash
# Eliminar contenedores detenidos
sudo docker container prune

# Eliminar imágenes sin usar
sudo docker image prune

# Eliminar todo (¡CUIDADO! Borra datos)
sudo docker-compose down -v
```

---

## 🔒 Seguridad

### Firewall (Opcional)
```bash
# Permitir puertos necesarios
sudo ufw allow 80/tcp
sudo ufw allow 5173/tcp
sudo ufw allow 3000/tcp
sudo ufw allow 5000/tcp
sudo ufw allow 8096/tcp
sudo ufw allow 9000/tcp
sudo ufw allow 9100/tcp

# Ver estado
sudo ufw status
```

### Cambiar Contraseñas por Defecto
1. **Base de datos:** Edita `docker-compose.yml` y cambia `POSTGRES_PASSWORD`
2. **Backend JWT:** Edita `backend/index.js` y cambia `JWT_SECRET`
3. **Admin del sistema:** Cambia la contraseña después del primer login

---

## 🧪 Escenarios de Prueba

### Escenario 1: Sistema de Usuarios
1. Accede a http://192.168.0.8:5173
2. Registra un nuevo usuario
3. Inicia sesión
4. Explora el dashboard
5. Verifica en la base de datos que se guardó

### Escenario 2: Biblioteca Digital
1. Accede a http://192.168.0.8:5000
2. Navega por las categorías
3. Abre un PDF
4. Descarga un documento
5. Prueba desde tu teléfono

### Escenario 3: Servidor Multimedia
1. Accede a http://192.168.0.8:8096
2. Completa la configuración inicial
3. Agrega contenido multimedia a `/media/movies`
4. Actualiza la biblioteca
5. Reproduce contenido

### Escenario 4: Gestión con Portainer
1. Accede a http://192.168.0.8:9000
2. Crea tu contraseña
3. Ve los contenedores activos
4. Revisa los logs
5. Reinicia un servicio

### Escenario 5: Monitoreo del Sistema
1. Accede a http://192.168.0.8:9100/metrics
2. Observa las métricas del sistema
3. Verifica uso de CPU y memoria
4. Monitorea el tráfico de red

---

## 📊 Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    Red Local WiFi ETB                    │
│                     192.168.0.0/24                       │
└─────────────────────────────────────────────────────────┘
                            │
                            │
┌───────────────────────────┴─────────────────────────────┐
│              Servidor Principal (192.168.0.8)            │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────┐  ┌────────────────┐                │
│  │   Frontend     │  │   Backend API  │                │
│  │   (React)      │  │   (Node.js)    │                │
│  │   :5173, :80   │  │     :3000      │                │
│  └────────┬───────┘  └────────┬───────┘                │
│           │                   │                          │
│           │                   │                          │
│  ┌────────┴───────────────────┴───────┐                │
│  │        Base de Datos PostgreSQL     │                │
│  │              :5432                  │                │
│  └─────────────────────────────────────┘                │
│                                                          │
│  ┌────────────────┐  ┌────────────────┐                │
│  │  Biblioteca    │  │    Jellyfin    │                │
│  │     PDFs       │  │   Multimedia   │                │
│  │    :5000       │  │     :8096      │                │
│  └────────────────┘  └────────────────┘                │
│                                                          │
│  ┌────────────────┐  ┌────────────────┐                │
│  │   Portainer    │  │ Node Exporter  │                │
│  │    Docker      │  │   Métricas     │                │
│  │    :9000       │  │     :9100      │                │
│  └────────────────┘  └────────────────┘                │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🎯 Casos de Uso

### Para Estudiantes
- 📚 Acceder a biblioteca de PDFs educativos
- 💬 Participar en foros de discusión
- 📺 Ver contenido educativo en Jellyfin
- 📝 Compartir recursos y apuntes

### Para Profesores
- 📤 Subir material educativo
- 👥 Gestionar grupos de estudio
- 📊 Monitorear participación
- 🎬 Compartir videos educativos

### Para Administradores
- 🔧 Gestionar usuarios y permisos
- 📊 Monitorear uso del sistema
- 🐳 Administrar servicios con Portainer
- 🔍 Revisar logs y métricas

### Para la Comunidad
- 🌐 Acceso a información local
- 💬 Comunicación descentralizada
- 📚 Biblioteca digital compartida
- 🎬 Entretenimiento y educación

---

## 🚀 Próximos Pasos

1. ✅ Configurar Jellyfin con contenido multimedia
2. ✅ Agregar más PDFs a la biblioteca
3. ✅ Crear usuarios y probar el foro
4. ✅ Configurar Portainer para gestión
5. 🔄 Integrar métricas con Grafana (opcional)
6. 🔄 Configurar backups automáticos
7. 🔄 Implementar sincronización entre nodos
8. 🔄 Agregar más servicios según necesidad

---

## 📞 Información de Soporte

**Sistema:** Guajira Mesh - Red Local Comunitaria  
**Versión:** 1.0.0  
**Fecha:** Octubre 2025  
**IP del Servidor:** 192.168.0.8  
**Red:** WiFi ETB  

**Servicios Activos:** 7/7 ✅

---

## 📝 Notas Importantes

1. **Todos los servicios están en Docker** - Fácil de gestionar y mantener
2. **Los datos persisten** - Volúmenes Docker guardan toda la información
3. **Acceso en red local** - Todos los dispositivos en WiFi ETB pueden acceder
4. **Portainer facilita la gestión** - No necesitas comandos para administrar
5. **Jellyfin necesita configuración inicial** - Primera vez requiere setup
6. **Las métricas son útiles** - Monitorea el rendimiento del sistema
7. **Backups recomendados** - Respalda los volúmenes Docker periódicamente

---

**¡Sistema Completo de Guajira Mesh Operativo! 🚀🌐📚🎬**
