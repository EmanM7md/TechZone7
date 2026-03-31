require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

let poolConfig = {};

if (process.env.DATABASE_URL) {
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  };
} else {
  poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'techzone_db',
    port: 5432,
  };
}

const pool = new Pool(poolConfig);

pool.initializeDb = async () => {
  try {
    console.log('Verifying/initializing database tables...');
    const setupSqlPath = path.join(__dirname, '../../setup-database.sql');
    if (fs.existsSync(setupSqlPath)) {
      const sqlFile = fs.readFileSync(setupSqlPath, 'utf8');
      await pool.query(sqlFile);
      console.log('Database tables verified/initialized successfully!');
    }
  } catch (err) {
    console.error('Database initialization failed:', err.message);
    throw err;
  }
};

module.exports = pool;