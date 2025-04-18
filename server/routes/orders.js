const express = require('express');
const router = express.Router();
const db = require('../db');

// Validation functions
const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateQuantity = (qty) => Number.isInteger(qty) && qty > 0 && qty < 100;

// Place order
router.post('/', (req, res) => {
    console.log("🛎️ Order received:", req.body);

    const { name, email, product, quantity } = req.body;
    if (!name || !email || !product || quantity == null) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!validateName(name)) {
        return res.status(400).json({ message: 'Invalid name: Only letters and spaces allowed.' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (!validateQuantity(quantity)) {
        return res.status(400).json({ message: 'Invalid quantity: Must be between 1 and 99.' });
    }

    const query = 'INSERT INTO orders (name, email, product, quantity) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, product, quantity], (err, result) => {
        if (err) {
            console.error('❌ MySQL error:', err);
            return res.status(500).json({ message: 'DB error', error: err });
        }
        res.json({ message: 'Order placed', orderId: result.insertId });
    });
});

// Update order status
router.post('/:id/status', (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) return res.status(400).json({ message: 'Missing status' });

    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    db.query(query, [status, orderId], (err, result) => {
        if (err) {
            console.error('❌ DB error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: `Order status updated to: ${status}` });
    });
});

// Get sales report
router.get('/report', (req, res) => {
    const query = 'SELECT id, name, product, quantity, status, order_time FROM orders ORDER BY order_time DESC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ DB error:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});

module.exports = router;
