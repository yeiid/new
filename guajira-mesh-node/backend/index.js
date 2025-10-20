const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'tu_super_secreto_jwt_cambiar_en_produccion';

// Configuración de la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middlewares
app.use(cors({
  origin: '*', // En producción, especifica los orígenes permitidos
  credentials: true
}));
app.use(express.json());

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Función para crear las tablas si no existen
const createTables = async () => {
  try {
    // Tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Tabla "users" verificada/creada correctamente.');

    // Tabla de posts del foro
    await pool.query(`
      CREATE TABLE IF NOT EXISTS forum_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Tabla "forum_posts" verificada/creada correctamente.');

    // Tabla de comentarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        post_id INTEGER REFERENCES forum_posts(id) ON DELETE CASCADE,
        author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Tabla "comments" verificada/creada correctamente.');

    // Tabla de información/recursos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS info_resources (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        category VARCHAR(50),
        content TEXT NOT NULL,
        author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ Tabla "info_resources" verificada/creada correctamente.');

    // Crear usuario admin por defecto si no existe
    const adminCheck = await pool.query('SELECT * FROM users WHERE email = $1', ['admin@guajiramesh.local']);
    if (adminCheck.rows.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash('admin123', salt);
      await pool.query(
        'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)',
        ['Administrador', 'admin@guajiramesh.local', password_hash, 'admin']
      );
      console.log('✓ Usuario administrador creado (email: admin@guajiramesh.local, password: admin123)');
    }
  } catch (error) {
    console.error('Error al crear las tablas:', error);
    process.exit(1);
  }
};

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    req.user = user;
    next();
  });
};

// Middleware para verificar rol admin
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador.' });
  }
  next();
};

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ 
    message: '¡La API de Guajira Mesh está funcionando!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ==================== AUTH ENDPOINTS ====================

// Endpoint para registrar un nuevo usuario
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at',
      [name, email, password_hash, 'user']
    );

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
    }
    console.error('Error en el registro:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Endpoint para iniciar sesión
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Validar token
app.get('/api/auth/validate', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Error al validar token:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// ==================== FORUM ENDPOINTS ====================

// Obtener todos los posts
app.get('/api/forum/posts', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, u.name as author_name, u.email as author_email,
             (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comment_count
      FROM forum_posts p
      JOIN users u ON p.author_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener posts:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Obtener un post específico
app.get('/api/forum/posts/:id', authenticateToken, async (req, res) => {
  try {
    const postResult = await pool.query(`
      SELECT p.*, u.name as author_name, u.email as author_email
      FROM forum_posts p
      JOIN users u ON p.author_id = u.id
      WHERE p.id = $1
    `, [req.params.id]);

    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    const commentsResult = await pool.query(`
      SELECT c.*, u.name as author_name, u.email as author_email
      FROM comments c
      JOIN users u ON c.author_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.created_at ASC
    `, [req.params.id]);

    res.json({
      ...postResult.rows[0],
      comments: commentsResult.rows
    });
  } catch (error) {
    console.error('Error al obtener post:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Crear un nuevo post
app.post('/api/forum/posts', authenticateToken, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Título y contenido son obligatorios.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO forum_posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear post:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Crear un comentario
app.post('/api/forum/posts/:id/comments', authenticateToken, async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'El contenido es obligatorio.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO comments (content, post_id, author_id) VALUES ($1, $2, $3) RETURNING *',
      [content, req.params.id, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// ==================== INFO ENDPOINTS ====================

// Obtener todos los recursos de información
app.get('/api/info', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.*, u.name as author_name
      FROM info_resources i
      JOIN users u ON i.author_id = u.id
      ORDER BY i.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener información:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Crear recurso de información (solo admin)
app.post('/api/info', authenticateToken, requireAdmin, async (req, res) => {
  const { title, description, category, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Título y contenido son obligatorios.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO info_resources (title, description, category, content, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, category, content, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear recurso:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor y crear las tablas
app.listen(port, async () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor de Guajira Mesh iniciado');
  console.log(`📡 Escuchando en http://localhost:${port}`);
  console.log('='.repeat(50));
  await createTables();
  console.log('='.repeat(50));
  console.log('✓ Sistema listo para recibir peticiones');
  console.log('='.repeat(50));
});
