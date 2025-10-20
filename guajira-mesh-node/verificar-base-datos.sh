#!/bin/bash

echo "=================================================="
echo "🔍 Verificación de Base de Datos - Guajira Mesh"
echo "=================================================="
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar si el contenedor está corriendo
if ! sudo docker ps | grep -q mesh_database; then
    echo -e "${YELLOW}⚠️  La base de datos no está corriendo${NC}"
    echo "Ejecuta: sudo docker-compose up -d db"
    exit 1
fi

echo -e "${GREEN}✅ Base de datos activa${NC}"
echo ""

# Función para ejecutar consultas SQL
query_db() {
    sudo docker exec -it mesh_database psql -U user -d mydatabase -c "$1"
}

# Mostrar usuarios
echo -e "${BLUE}👥 USUARIOS REGISTRADOS:${NC}"
echo "=================================================="
query_db "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC;"
echo ""

# Mostrar posts del foro
echo -e "${BLUE}📝 POSTS DEL FORO:${NC}"
echo "=================================================="
query_db "SELECT p.id, p.title, u.name as autor, p.created_at FROM forum_posts p JOIN users u ON p.author_id = u.id ORDER BY p.created_at DESC LIMIT 10;"
echo ""

# Mostrar comentarios
echo -e "${BLUE}💬 COMENTARIOS:${NC}"
echo "=================================================="
query_db "SELECT c.id, c.content, u.name as autor, c.created_at FROM comments c JOIN users u ON c.author_id = u.id ORDER BY c.created_at DESC LIMIT 10;"
echo ""

# Mostrar recursos de información
echo -e "${BLUE}📚 RECURSOS DE INFORMACIÓN:${NC}"
echo "=================================================="
query_db "SELECT id, title, category, author_id, created_at FROM info_resources ORDER BY created_at DESC LIMIT 10;"
echo ""

# Estadísticas
echo -e "${BLUE}📊 ESTADÍSTICAS:${NC}"
echo "=================================================="
echo -n "Total de usuarios: "
query_db "SELECT COUNT(*) FROM users;" | grep -E "^\s*[0-9]+" | tr -d ' '
echo -n "Total de posts: "
query_db "SELECT COUNT(*) FROM forum_posts;" | grep -E "^\s*[0-9]+" | tr -d ' '
echo -n "Total de comentarios: "
query_db "SELECT COUNT(*) FROM comments;" | grep -E "^\s*[0-9]+" | tr -d ' '
echo -n "Total de recursos: "
query_db "SELECT COUNT(*) FROM info_resources;" | grep -E "^\s*[0-9]+" | tr -d ' '
echo ""

echo "=================================================="
echo -e "${GREEN}✅ Verificación completada${NC}"
echo "=================================================="
echo ""
echo -e "${BLUE}💡 Comandos útiles:${NC}"
echo "  - Conectarse a la DB: sudo docker exec -it mesh_database psql -U user -d mydatabase"
echo "  - Ver logs: sudo docker-compose logs db"
echo "  - Reiniciar DB: sudo docker-compose restart db"
echo ""
