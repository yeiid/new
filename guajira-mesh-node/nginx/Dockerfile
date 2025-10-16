FROM nginx:alpine

# Eliminar configuraciones por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuración personalizada
COPY mesh.conf /etc/nginx/conf.d/

# Crear directorios necesarios
RUN mkdir -p /usr/share/nginx/pdf_output /usr/share/nginx/pdfs

# Establecer permisos
RUN chown -R nginx:nginx /usr/share/nginx/

# Exponer puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
