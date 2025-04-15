const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new user (employee)
router.post('/', (req, res) => {
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({ message: 'Missing name or role' });
    }

    const query = 'INSERT INTO users (name, role) VALUES (?, ?)';
    db.query(query, [name, role], (err, result) => {
        if (err) {
            console.error('❌ MySQL error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: `User ${name} added as ${role}`, userId: result.insertId });
    });
});

module.exports = router;
