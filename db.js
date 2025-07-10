import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

sqlite3.verbose();

const db = new sqlite3.Database(process.env.DATABASE || 'catalog.db', (err) => {
  if (err) {
    console.error('❌ Could not connect to database', err.message);
  } else {
    console.log('✅ Connected to SQLite database.');
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        category TEXT,
        price REAL
      )
    `);
  }
});

export default db;
