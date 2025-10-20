#!/bin/bash

echo "=================================================="
echo "🚀 Iniciando Guajira Mesh - Red Local"
echo "=================================================="
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Obtener IP de la red
IP=$(ip addr show | grep "inet " | grep -v "127.0.0.1" | awk '{print $2}' | cut -d/ -f1 | head -1)

echo -e "${BLUE}📍 IP del servidor:${NC} $IP"
echo ""

# Verificar si Docker está corriendo
if ! sudo docker ps > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Docker no está corriendo. Iniciando...${NC}"
    sudo systemctl start docker
    sleep 2
fi

# Iniciar servicios de Docker (Backend y Base de Datos)
echo -e "${BLUE}🐳 Iniciando Backend y Base de Datos...${NC}"
cd "$(dirname "$0")"
sudo docker-compose up -d backend db

# Esperar a que los servicios estén listos
echo -e "${BLUE}⏳ Esperando a que los servicios estén listos...${NC}"
sleep 5

# Verificar estado de los servicios
echo ""
echo -e "${BLUE}📊 Estado de los servicios:${NC}"
sudo docker-compose ps

# Verificar que el backend responda
echo ""
echo -e "${BLUE}🔍 Verificando backend...${NC}"
if curl -s http://localhost:3000/api > /dev/null; then
    echo -e "${GREEN}✅ Backend funcionando correctamente${NC}"
else
    echo -e "${YELLOW}⚠️  Backend aún no responde, esperando...${NC}"
    sleep 5
fi

# Iniciar frontend
echo ""
echo -e "${BLUE}🌐 Iniciando Frontend...${NC}"
cd mesh-frontend

# Cargar nvm y usar Node 20
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20 > /dev/null 2>&1

# Actualizar .env con la IP actual
echo "VITE_API_URL=http://$IP:3000/api" > .env
echo -e "${GREEN}✅ Configurado API URL: http://$IP:3000/api${NC}"

echo ""
echo "=================================================="
echo -e "${GREEN}✅ Servicios iniciados correctamente${NC}"
echo "=================================================="
echo ""
echo -e "${BLUE}📱 Acceso desde este dispositivo:${NC}"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3000"
echo ""
echo -e "${BLUE}🌐 Acceso desde otros dispositivos en la red:${NC}"
echo "   Frontend: http://$IP:5173"
echo "   Backend:  http://$IP:3000"
echo ""
echo -e "${BLUE}👤 Usuario administrador por defecto:${NC}"
echo "   Email:    admin@guajiramesh.local"
echo "   Password: admin123"
echo ""
echo -e "${YELLOW}⚠️  Asegúrate de que todos los dispositivos estén en la misma red WiFi${NC}"
echo ""
echo "=================================================="
echo -e "${BLUE}🚀 Iniciando servidor de desarrollo...${NC}"
echo "=================================================="
echo ""

# Iniciar el servidor de desarrollo
npm run dev -- --host
