const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Load .env variables
require('dotenv').config();

// Use middleware CORS, to automatically set Access-Control-Allow-Origin header
app.use(cors());

// Database connection config, using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

// Connect to database
db.connect(err => {
    if (err) {
        console.error('Connection to database failed:', err.stack);
        return;
    }
    console.log('Connection to database successfull.');
});

// Handling GET request for data retrival from database
app.get('/getData', (req, res) => {
    const caliber = req.query.caliber || '';
    const dateFilter = req.query.dateFilter === 'true';

    let tableName = process.env.DB_TABLE;
    let sql = `SELECT caliber, shop, link, product_name, price, available, date_updated FROM ${tableName} WHERE caliber = ?`;
    if (dateFilter) {
        sql += " AND date_updated >= NOW() - INTERVAL 1 DAY";
    }

    db.query(sql, [caliber], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error.');
            return;
        }
        res.json(results);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
