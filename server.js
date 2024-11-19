import express from 'express';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const app = express();
const db = new Database('clientes.db');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Inicializar base de datos
db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombres TEXT NOT NULL,
    cedula TEXT UNIQUE NOT NULL,
    usuario TEXT UNIQUE NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// Rutas API
app.post('/api/clientes', (req, res) => {
  const { nombres, cedula, usuario, correo, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  try {
    const stmt = db.prepare('INSERT INTO clientes (nombres, cedula, usuario, correo, password) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(nombres, cedula, usuario, correo, hashedPassword);
    res.json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/clientes', (req, res) => {
  const stmt = db.prepare('SELECT id, nombres, cedula, usuario, correo FROM clientes');
  const clientes = stmt.all();
  res.json(clientes);
});

app.get('/api/clientes/:cedula', (req, res) => {
  const stmt = db.prepare('SELECT id, nombres, cedula, usuario, correo FROM clientes WHERE cedula = ?');
  const cliente = stmt.get(req.params.cedula);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ error: 'Cliente no encontrado' });
  }
});

app.put('/api/clientes/:id', (req, res) => {
  const { nombres, cedula, usuario, correo, password } = req.body;
  try {
    let stmt;
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      stmt = db.prepare('UPDATE clientes SET nombres = ?, cedula = ?, usuario = ?, correo = ?, password = ? WHERE id = ?');
      stmt.run(nombres, cedula, usuario, correo, hashedPassword, req.params.id);
    } else {
      stmt = db.prepare('UPDATE clientes SET nombres = ?, cedula = ?, usuario = ?, correo = ? WHERE id = ?');
      stmt.run(nombres, cedula, usuario, correo, req.params.id);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/clientes/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM clientes WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});