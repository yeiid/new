# 1. Fase de Construcción
# ---- Base Stage ----
# Etapa para instalar dependencias
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies Stage ----
# Etapa para instalar solo las dependencias
FROM base AS dependencies
RUN npm install

# ---- Development Stage ----
# Etapa para el entorno de desarrollo
FROM base AS dev
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
# Expone el puerto por defecto de Vite
EXPOSE 5173
# El comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host"]

# ---- Build Stage ----
# Etapa para construir los archivos estáticos para producción
FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Production Stage ----
# Etapa final que sirve los archivos estáticos con Nginx
FROM nginx:stable-alpine AS production
# Copia los archivos estáticos construidos desde la etapa 'build'
COPY --from=build /app/dist /usr/share/nginx/html
# Copia la configuración de Nginx para que funcione con React Router
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
