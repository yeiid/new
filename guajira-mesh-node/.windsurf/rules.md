# Reglas del Proyecto: Guajira Mesh Node

## 1. Contexto del Proyecto

**Guajira Mesh Node** es un sistema multi-servicio empaquetado con Docker Compose, diseñado para operar en entornos de red descentralizados o con conectividad limitada (redes mesh). Su propósito es ofrecer servicios esenciales como acceso a información (PDFs), multimedia (Jellyfin) y un panel de administración web, de forma autónoma y resiliente.

- **Stack Principal**: Docker, Docker Compose, Nginx, Python (Flask), Jellyfin.
- **Arquitectura**: Microservicios desacoplados que se comunican a través de una red Docker interna.

## 2. Metas a Alcanzar

- **Facilidad de Despliegue**: Cualquier persona con conocimientos básicos de Docker debe poder configurar y lanzar un nodo en minutos.
- **Portabilidad**: El proyecto debe ser agnóstico al hardware y sistema operativo subyacente (siempre que soporte Docker).
- **Escalabilidad**: Permitir que se añadan nuevos servicios fácilmente y que los existentes puedan manejar una carga de usuarios creciente (dentro de los límites del hardware del nodo).
- **Mantenibilidad**: El código y la configuración deben ser claros, documentados y fáciles de modificar sin introducir errores.

## 3. Reglas de Codificación y Estructura

### Legibilidad y Claridad

- **Nomenclatura**: Usar nombres de variables, funciones y servicios descriptivos y consistentes. Evitar abreviaturas ambiguas.
- **Comentarios**: Comentar solo la lógica compleja o el "porqué" de una decisión de diseño, no el "qué" hace el código. El código debe ser auto-descriptivo.
- **Estilo de Código**: 
  - **Python**: Seguir estrictamente el estándar `PEP 8`.
  - **Dockerfile/YAML**: Mantener una indentación consistente y agrupar directivas lógicamente.

### Escalabilidad y Mantenibilidad

- **Configuración Externalizada**: NUNCA hardcodear valores de configuración (puertos, rutas, credenciales). Usar siempre variables de entorno gestionadas a través de un archivo `.env`.
- **Servicios Sin Estado (Stateless)**: Los servicios deben ser, en la medida de lo posible, sin estado. La persistencia de datos debe delegarse a volúmenes de Docker.
- **Modularidad**: Cada servicio Docker debe tener una única responsabilidad. Dentro de cada servicio, el código debe estar organizado en módulos o funciones cohesivas.
- **Imágenes Docker Ligeras**: Utilizar siempre las imágenes base más pequeñas posibles (ej. `python:3.11-slim`, `nginx:alpine`).
- **Optimización de Build**: 
  - Usar siempre un archivo `.dockerignore` para excluir archivos innecesarios del contexto de build.
  - Ordenar los comandos en los `Dockerfile` para aprovechar al máximo la caché de capas de Docker (instalar dependencias primero).

### Reglas para Docker Compose

- **Salud del Servicio (Healthchecks)**: Añadir `healthcheck` a los servicios críticos en `docker-compose.yml` para asegurar que se inician correctamente y gestionar dependencias de arranque.
- **Nombres Explícitos**: Asignar nombres de contenedor (`container_name`) y de red explícitos para facilitar la depuración y la referencia entre servicios.
- **No Usar `version`**: El atributo `version` en la raíz de los archivos de Compose es obsoleto y debe ser omitido.
