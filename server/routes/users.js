const express = require('express');
const router = express.Router();
const db = require('../db');

// Helpers
const isValidName = (name) => /^[A-Za-z\s]+$/.test(name) && name.length <= 50;
const isValidRole = (role) => /^[A-Za-z\s]+$/.test(role) && role.length <= 50;

// Add a new user (employee)
router.post('/', (req, res) => {
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({ message: 'Missing name or role' });
    }

    if (!isValidName(name)) {
        return res.status(400).json({ message: 'Invalid name: only letters and spaces, max 50 characters.' });
    }

    if (!isValidRole(role)) {
        return res.status(400).json({ message: 'Invalid role: only letters and spaces, max 50 characters.' });
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

// Update order status with ID validation
router.post('/status/:id', (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Missing status' });
    }

    // First, check if the order exists
    db.query('SELECT * FROM orders WHERE id = ?', [orderId], (err, results) => {
        if (err) {
            console.error('❌ MySQL error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Proceed to update
        const updateQuery = 'UPDATE orders SET status = ? WHERE id = ?';
        db.query(updateQuery, [status, orderId], (err) => {
            if (err) {
                console.error('❌ MySQL error:', err);
                return res.status(500).json({ message: 'Failed to update status' });
            }
            res.json({ message: `Order status updated to: ${status}` });
        });
    });
});

module.exports = router;
