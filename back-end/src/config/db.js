require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Add SSL for cloud deployments where it is strictly required
if (process.env.NODE_ENV === 'production' || process.env.DB_SSL === 'true') {
  dbConfig.ssl = {
    rejectUnauthorized: false
  };
}

const pool = mysql.createPool(dbConfig);

pool.initializeDb = async () => {
  let setupConnection;
  try {
    console.log('Connecting to MySQL to verify/initialize database...');
    
    // Connect to MySQL server without selecting a database
    const setupConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    };
    if (dbConfig.ssl) setupConfig.ssl = dbConfig.ssl;

    setupConnection = await mysql.createConnection(setupConfig);

    const setupSqlPath = path.join(__dirname, '../../setup-database.sql');
    if (fs.existsSync(setupSqlPath)) {
      const sqlFile = fs.readFileSync(setupSqlPath, 'utf8');
      const statements = sqlFile.split(';').map(s => s.trim()).filter(s => s.length > 0);
      for (const statement of statements) {
        await setupConnection.query(statement);
      }
      console.log(`Database and tables verified/initialized successfully!`);
    } else {
      console.warn('setup-database.sql not found, skipping table initialization.');
    }
  } catch (err) {
    console.error('Database initialization failed:', err.message);
    throw err; // Stop the server if DB cannot be initialized
  } finally {
    if (setupConnection) await setupConnection.end();
  }
};

module.exports = pool;