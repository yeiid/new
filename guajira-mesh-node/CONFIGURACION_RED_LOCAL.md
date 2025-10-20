# 🌐 Configuración de Red Local - Guajira Mesh

## 📍 Información de Red

**IP del Servidor (Nodo Principal):** `192.168.0.8`  
**Red WiFi:** ETB  
**Rango de Red:** 192.168.0.0/24

---

## 🚀 Servicios Activos

### 1. **Frontend (React + Vite)**
- **Puerto:** 5173, 80
- **URL Local:** http://localhost:5173 o http://localhost
- **URL en Red:** http://192.168.0.8:5173 o http://192.168.0.8
- **Estado:** ✅ Activo (Docker)

### 2. **Backend API (Node.js + Express)**
- **Puerto:** 3000
- **URL Local:** http://localhost:3000
- **URL en Red:** http://192.168.0.8:3000
- **Estado:** ✅ Activo (Docker)
- **Endpoints disponibles:**
  - `GET /api` - Verificar estado
  - `POST /api/auth/register` - Registrar usuario
  - `POST /api/auth/login` - Iniciar sesión
  - `GET /api/auth/validate` - Validar token
  - `GET /api/forum/posts` - Listar posts del foro
  - `POST /api/forum/posts` - Crear post
  - `GET /api/info` - Listar información

### 3. **Base de Datos (PostgreSQL)**
- **Puerto:** 5432 (interno)
- **Estado:** ✅ Activo (Docker)
- **Tablas creadas:**
  - `users` - Usuarios del sistema
  - `forum_posts` - Publicaciones del foro
  - `comments` - Comentarios
  - `info_resources` - Recursos de información

### 4. **Biblioteca Digital de PDFs**
- **Puerto:** 5000
- **URL Local:** http://localhost:5000
- **URL en Red:** http://192.168.0.8:5000
- **Estado:** ✅ Activo (Docker)
- **Características:**
  - Visualización de PDFs en el navegador
  - Miniaturas de portadas
  - Búsqueda de documentos
  - Descarga de archivos
  - Interfaz moderna y responsive

---

## 📱 Cómo Acceder desde Otros Dispositivos

### Desde un Teléfono o Tablet (Misma Red WiFi)

1. **Conecta tu dispositivo a la red WiFi de ETB**
2. **Abre el navegador y accede a:**
   ```
   http://192.168.0.8:5173
   ```
3. **Verás la landing page de Guajira Mesh**

### Desde Otra Computadora (Misma Red WiFi)

1. **Conecta la computadora a la red WiFi de ETB**
2. **Abre el navegador y accede a:**
   ```
   http://192.168.0.8:5173
   ```

---

## 🧪 Pruebas de Funcionalidad

### 1. Verificar Conectividad

Desde cualquier dispositivo en la red, ejecuta:

```bash
# Verificar que el servidor responde
curl http://192.168.0.8:3000/api

# Debería responder:
# {
#   "message": "¡La API de Guajira Mesh está funcionando!",
#   "version": "1.0.0",
#   "timestamp": "..."
# }
```

### 2. Registrar un Usuario

**Desde el Frontend:**
1. Accede a `http://192.168.0.8:5173`
2. Haz clic en "Registrarse"
3. Completa el formulario:
   - Nombre: Tu nombre
   - Email: tu@email.com
   - Contraseña: mínimo 6 caracteres
4. Haz clic en "Registrarse"
5. Serás redirigido al dashboard

**Desde la API (usando curl):**
```bash
curl -X POST http://192.168.0.8:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Prueba",
    "email": "prueba@test.com",
    "password": "123456"
  }'
```

### 3. Iniciar Sesión

**Usuario Administrador por Defecto:**
- **Email:** admin@guajiramesh.local
- **Contraseña:** admin123

**Desde el Frontend:**
1. Accede a `http://192.168.0.8:5173/login`
2. Ingresa las credenciales
3. Haz clic en "Iniciar Sesión"

### 4. Verificar Base de Datos

**Conectarse a la base de datos:**
```bash
sudo docker exec -it mesh_database psql -U user -d mydatabase
```

**Consultas útiles:**
```sql
-- Ver todos los usuarios
SELECT id, name, email, role, created_at FROM users;

-- Ver posts del foro
SELECT * FROM forum_posts;

-- Ver recursos de información
SELECT * FROM info_resources;

-- Salir
\q
```

---

## 🔒 Seguridad en Red Local

### Firewall (Opcional)

Si tienes firewall activo, permite los puertos:

```bash
# Permitir puerto del frontend
sudo ufw allow 5173/tcp

# Permitir puerto del backend
sudo ufw allow 3000/tcp

# Verificar estado
sudo ufw status
```

---

## 🛠️ Comandos Útiles

### Gestión de Servicios Docker

```bash
# Ver servicios activos
sudo docker-compose ps

# Ver logs del backend
sudo docker-compose logs -f backend

# Ver logs de la base de datos
sudo docker-compose logs -f db

# Reiniciar servicios
sudo docker-compose restart backend db

# Detener servicios
sudo docker-compose down

# Iniciar servicios
sudo docker-compose up -d backend db

# Eliminar todo (incluyendo datos)
sudo docker-compose down -v
```

### Gestión del Frontend

```bash
# Iniciar servidor de desarrollo (con acceso en red)
cd mesh-frontend
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20
npm run dev -- --host

# El servidor estará disponible en:
# - Local: http://localhost:5173
# - Red: http://192.168.0.8:5173
```

---

## 📊 Monitoreo

### Ver Logs en Tiempo Real

**Backend:**
```bash
sudo docker-compose logs -f backend
```

**Base de Datos:**
```bash
sudo docker-compose logs -f db
```

**Frontend:**
Los logs aparecen en la terminal donde ejecutaste `npm run dev`

---

## 🧪 Escenarios de Prueba

### Escenario 1: Registro y Login desde Teléfono
1. Conecta tu teléfono a WiFi ETB
2. Abre navegador y ve a `http://192.168.0.8:5173`
3. Registra un nuevo usuario
4. Verifica que puedas iniciar sesión
5. Navega por el dashboard

### Escenario 2: Crear Post en el Foro
1. Inicia sesión en el sistema
2. Ve a "Foro" en el menú
3. Crea una nueva publicación
4. Verifica que se guarde en la base de datos
5. Desde otra computadora/teléfono, verifica que aparezca el post

### Escenario 3: Verificar Persistencia de Datos
1. Registra varios usuarios
2. Crea posts y comentarios
3. Reinicia los servicios Docker:
   ```bash
   sudo docker-compose restart backend db
   ```
4. Verifica que los datos persistan

### Escenario 4: Acceso Simultáneo
1. Abre la aplicación desde 2-3 dispositivos diferentes
2. Inicia sesión con usuarios diferentes
3. Crea contenido desde cada dispositivo
4. Verifica que todos vean los cambios

---

## 🔧 Solución de Problemas

### El frontend no carga
```bash
# Verifica que el servidor esté corriendo
curl http://192.168.0.8:5173

# Reinicia el servidor
cd mesh-frontend
npm run dev -- --host
```

### Error "Network Error" al registrar
```bash
# Verifica que el backend esté corriendo
curl http://192.168.0.8:3000/api

# Verifica los logs
sudo docker-compose logs backend

# Reinicia el backend
sudo docker-compose restart backend
```

### No puedo acceder desde otro dispositivo
```bash
# Verifica tu IP
ip addr show | grep "inet "

# Verifica que los puertos estén abiertos
sudo netstat -tulpn | grep -E '3000|5173'

# Verifica el firewall
sudo ufw status
```

---

## 📝 Notas Importantes

1. **Todos los dispositivos deben estar en la misma red WiFi (ETB)**
2. **La IP 192.168.0.8 puede cambiar si reinicias el router o la computadora**
3. **Los datos se guardan en volúmenes Docker y persisten entre reinicios**
4. **El usuario admin por defecto es: admin@guajiramesh.local / admin123**
5. **Para producción, cambiar el JWT_SECRET y las credenciales de la base de datos**

---

## 🎯 Próximos Pasos

1. ✅ Verificar que el backend y DB estén funcionando
2. ✅ Probar registro de usuarios desde el frontend
3. ✅ Verificar que los datos se guarden en PostgreSQL
4. ✅ Probar acceso desde múltiples dispositivos
5. 🔄 Implementar sincronización en tiempo real (WebSockets)
6. 🔄 Agregar más funcionalidades al foro
7. 🔄 Implementar sistema de archivos compartidos

---

## 📞 Contacto y Soporte

Para reportar problemas o sugerencias, documenta:
- IP del dispositivo
- Navegador y versión
- Mensaje de error exacto
- Logs del backend/frontend
