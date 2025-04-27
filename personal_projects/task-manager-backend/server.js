const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON request bodies

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// API Routes

// Get all tasks
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, due_date, category, priority } = req.body;
  const sql = 'INSERT INTO tasks (title, description, due_date, category, priority) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, description, due_date, category, priority], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: result.insertId,
      title,
      description,
      due_date,
      category,
      priority,
      status: 'Pending'
    });
  });
});

// Update a task's status
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;
  const sql = 'UPDATE tasks SET status = ? WHERE id = ?';
  db.query(sql, [status, taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Task updated successfully' });
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [taskId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
