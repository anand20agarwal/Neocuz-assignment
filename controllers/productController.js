import db from '../db.js';
import { v4 as uuidv4 } from 'uuid';

// Add product
export const addProduct = (req, res) => {
  const { name, category, price } = req.body;
  const id = uuidv4();

  if (!name || !category || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.run(
    'INSERT INTO products (id, name, category, price) VALUES (?, ?, ?, ?)',
    [id, name, category, price],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add product' });
      } else {
        res.status(201).json({ id, name, category, price });
      }
    }
  );
};

// Get all products
export const getAllProducts = (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(rows);
    }
  });
};

// Get product by ID
export const getProductById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching product' });
    } else if (!row) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(row);
    }
  });
};

// List unique categories
export const getUniqueCategories = (req, res) => {
  db.all('SELECT DISTINCT category FROM products', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching categories' });
    } else {
      const categories = rows.map(r => r.category);
      res.json(categories);
    }
  });
};

// Group products by category
export const getProductsGroupedByCategory = (req, res) => {
  db.all(
    'SELECT category, GROUP_CONCAT(name) as products FROM products GROUP BY category',
    [],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error grouping products' });
      } else {
        res.json(rows);
      }
    }
  );
};
