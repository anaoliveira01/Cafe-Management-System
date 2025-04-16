
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',  // <- replace this with your actual MySQL password
    database: 'cafe_db'
});

const createOrdersTable = `
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    product VARCHAR(100),
    quantity INT,
    status VARCHAR(50) DEFAULT 'Pending',
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    role VARCHAR(50)
  )
`;

// Run both creation queries
connection.query(createOrdersTable, (err) => {
    if (err) console.error('❌ Error creating orders table:', err);
    else console.log('✅ Orders table checked/created');
});

connection.query(createUsersTable, (err) => {
    if (err) console.error('❌ Error creating users table:', err);
    else console.log('✅ Users table checked/created');
});

connection.connect(err => {
    if (err) {
        console.error('❌ MySQL connection error:', err);
    } else {
        console.log('✅ Connected to MySQL database');
    }
});

module.exports = connection;
