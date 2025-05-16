// electron/database.js
const sqlite3 = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Define the path for the database file
// It's good practice to store user data in the app's user data path
const dbPath = path.join(require('electron').app.getPath('userData'), 'componentLibrary.db');

let db;

function initDb(callback) {
  // Ensure the directory exists
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new sqlite3(dbPath, { verbose: console.log }); // verbose logs SQL queries

  // Create table if it doesn't exist
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS components (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL, -- 'react', 'html_css'
        react_code TEXT,
        html_code TEXT,
        css_code TEXT,
        tags TEXT, -- Store as JSON string array: '["tag1", "tag2"]'
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    db.exec(createTableSql);
    if (callback) callback(null);
  } catch (err) {
    console.error("Error initializing database table:", err);
    if (callback) callback(err);
  }
}

// Function to get the database instance
function getDb() {
  if (!db) {
    // This case should ideally not happen if initDb is called correctly on app start
    console.warn("Database not initialized. Initializing now.");
    initDb((err) => {
      if (err) throw new Error("Failed to initialize DB on demand.");
    });
  }
  return db;
}

module.exports = {
  initDb,
  getDb,
};
