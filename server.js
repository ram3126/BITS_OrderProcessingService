const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3003;

app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'postgres',
  password: 'DB@1234',
  port: 5432,
});

app.post('/orders', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO orders (userId, productId, quantity) VALUES ($1, $2, $3) RETURNING *',
      [userId, productId, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Order Processing Service is running on port ${port}`);
});

module.exports = app;
