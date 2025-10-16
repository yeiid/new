# 1. Fase de Construcción (si usas un framework como React/Vue)
# FROM node:20 as builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build  # Reemplaza 'npm run build' con tu comando de compilación

# 2. Fase de Ejecución (Servir el contenido compilado)
# Usamos una imagen de Nginx súper ligera (Alpine)
FROM nginx:alpine

# Copia la configuración personalizada de Nginx (si la necesitas)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copia el build de tu proyecto compilado a la ubicación de Nginx
# Si no tienes fase de construcción, copia directamente tu HTML/CSS/JS aquí
COPY ./public /usr/share/nginx/html

# El contenedor expone por defecto el puerto 80 (ya lo hace Nginx)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
