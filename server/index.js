const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

// Force logs to verify server flow
console.log('✅ Server file loaded');

app.use(cors());
app.use(express.json());

// Log for every incoming request
app.use((req, res, next) => {
    console.log(`📥 Incoming: ${req.method} ${req.url}`);
    next();
});

app.use('/users', require('./routes/users'));


// /ping test route
app.get('/ping', (req, res) => {
    console.log('✅ Ping received!');
    res.send('pong');
});

// /orders route
const ordersRoute = require('./routes/orders');
app.use('/orders', ordersRoute);

// Final fallback route to catch unhandled ones
app.use((req, res) => {
    console.log(`❌ Unknown route: ${req.method} ${req.url}`);
    res.status(404).send('Not found');
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
