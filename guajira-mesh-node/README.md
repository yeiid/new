# Guajira Mesh Node

Proyecto empaquetado con Docker Compose para desplegar y distribuir un nodo con:

- **web**: Servidor Nginx que sirve el frontend estático y expone PDFs.
- **pdf-manager**: Servicio Flask (Gunicorn) para previsualización/caratulas de PDFs.
- **jellyfin**: Servidor multimedia.
- **node-exporter**: Métricas del sistema.
- **portainer**: Panel de administración Docker.

Archivos clave:

- `docker-compose.yml`
- `docker-compose.override.yml` (opcional, para escenario con `pdf-scanner`)
- `nginx/Dockerfile` y `nginx/mesh.conf`
- `mesh-frontend/Dockerfile` y `mesh-frontend/public/`
- `pdf-manager/Dockerfile`, `pdf-manager/app.py`, `pdf-manager/requirements.txt`
- `.env.example` (copia a `.env` y ajusta valores)

## Requisitos

- Docker 20+ y Docker Compose v2
- Puertos libres: 80, 8096, 9000, 9100 (ajústalos si es necesario)

## Configuración rápida

1. Clona o descarga este repositorio.
2. Copia el ejemplo de variables y edítalo:

```bash
cp .env.example .env
# Edita TZ y PUBLISHED_URL según tu entorno
```

3. Prepara directorios y contenido:

- Coloca PDFs en `./pdf/`
- Contenido estático del sitio en `./mesh-frontend/public/`
- Medios de Jellyfin en `./media/movies/` y `./media/educational/`

## Construcción de imágenes

```bash
docker compose build
```

Servicios con build local:

- `web` (contexto `mesh-frontend/`, Nginx sirve `public/`)
- `pdf-manager` (Flask + Gunicorn)

`jellyfin`, `node-exporter` y `portainer` usan imágenes públicas.

## Ejecución

```bash
docker compose up -d
```

Accesos por defecto:

- Web estático y PDFs: http://localhost/
- Jellyfin: http://localhost:8096/
- Node Exporter: http://localhost:9100/metrics
- Portainer: http://localhost:9000/

Variables principales (en `.env`):

- `TZ`: zona horaria (ej. `America/Bogota`)
- `PUBLISHED_URL`: URL/IP que Jellyfin anuncia (ej. `http://192.168.1.50`)

## Logs y estado

```bash
docker compose ps
docker compose logs -f web
```

## Distribución (publicar imágenes)

Puedes etiquetar y publicar las imágenes construidas para distribuir el proyecto sin el código fuente.

1. Autentícate en tu registro (Docker Hub como ejemplo):

```bash
docker login
```

2. Construye y etiqueta:

```bash
# Frontend (Nginx con contenido estático)
docker build -t <namespace>/mesh-web:latest ./mesh-frontend

# PDF Manager (Flask)
docker build -t <namespace>/pdf-manager:latest ./pdf-manager
```

3. Sube las imágenes:

```bash
docker push <namespace>/mesh-web:latest
docker push <namespace>/pdf-manager:latest
```

4. Para usarlas vía Compose, puedes editar `docker-compose.yml` para añadir `image: <namespace>/...` en `web` y `pdf-manager`, o bien ejecutar `docker compose up` donde existan esas imágenes.

> Nota: También puedes usar Buildx para multi-arquitectura (arm64/amd64):
>
> ```bash
> docker buildx create --use --name meshbuilder || true
> docker buildx build --platform linux/amd64,linux/arm64 -t <namespace>/mesh-web:latest ./mesh-frontend --push
> docker buildx build --platform linux/amd64,linux/arm64 -t <namespace>/pdf-manager:latest ./pdf-manager --push
> ```

## Notas sobre `docker-compose.override.yml`

- Incluye un servicio `pdf-scanner` (no presente en este repo) y un healthcheck para `web`.
- Úsalo si cuentas con el directorio `pdf-scanner/` y su `Dockerfile`.
- Si no lo usas, puedes ignorar/eliminar el override o mantenerlo sin afectar `docker-compose.yml`.

## Personalización

- Ajusta rutas montadas en `docker-compose.yml` bajo `./media/` y `./pdf/`.
- Edita Nginx en `nginx/mesh.conf` según tus necesidades.
- Para Jellyfin en otra red/host, establece `PUBLISHED_URL` en `.env`.

## Solución de problemas

- Verifica permisos de volúmenes: en Linux, asegúrate de que el usuario pueda leer `./pdf/` y `./media/`.
- Si el puerto 80 está ocupado, cambia a `8080:80` en `web`.
- Si `wget` no está disponible para el healthcheck del override, instala en la imagen o elimina el healthcheck del override.

## Licencia

Define y añade una licencia si planeas distribuir públicamente.
