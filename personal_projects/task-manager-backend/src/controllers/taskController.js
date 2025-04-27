const db = require('../db/db'); // Import the database connection

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM tasks');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, due_date, category, priority } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, due_date, category, priority) VALUES (?, ?, ?, ?, ?)',
      [title, description, due_date, category, priority]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
