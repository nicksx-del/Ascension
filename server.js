const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/'))); // Serve static files (HTML, CSS, JS)

// Mock Database (File-based persistence)
const DB_FILE = path.join(__dirname, 'backend', 'data', 'db.json');

// Ensure DB directory and file exist
if (!fs.existsSync(path.join(__dirname, 'backend', 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'backend', 'data'), { recursive: true });
}
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ transactions: [], user: {}, card: {} }, null, 2));
}

// Helper to read/write DB
const readDB = () => JSON.parse(fs.readFileSync(DB_FILE));
const writeDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// API Routes

// 1. Get Transactions
app.get('/api/transactions', (req, res) => {
    const db = readDB();
    res.json(db.transactions);
});

// 2. Add Transaction
app.post('/api/transactions', (req, res) => {
    const db = readDB();
    const newTransaction = { id: Date.now(), ...req.body };
    db.transactions.push(newTransaction);
    writeDB(db);
    res.status(201).json(newTransaction);
});

// 3. Get User Info
app.get('/api/user', (req, res) => {
    const db = readDB();
    res.json(db.user);
});

// 4. Update User Info
app.post('/api/user', (req, res) => {
    const db = readDB();
    db.user = { ...db.user, ...req.body };
    writeDB(db);
    res.json(db.user);
});

// 5. Get Balance Summary (Expenses Only as per request)
app.get('/api/summary', (req, res) => {
    const db = readDB();
    const total = db.transactions.reduce((sum, t) => {
        const val = Number(t.amount || 0);
        return val < 0 ? sum + val : sum;
    }, 0);
    res.json({ total, currency: 'BRL' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📂 Serving static files from: ${__dirname}`);
});
