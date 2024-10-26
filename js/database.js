const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000; // Możesz zmienić port, jeśli jest zajęty
const cors = require('cors'); // Dodaj ten import
require('dotenv').config(); // Ładowanie zmiennych środowiskowych


// Użyj middleware CORS
app.use(cors()); // To automatycznie ustawi nagłówek Access-Control-Allow-Origin

// Konfiguracja połączenia z bazą danych z użyciem zmiennych środowiskowych
const db = mysql.createConnection({
    host: process.env.DB_HOST,    // Host bazy danych
    user: process.env.DB_USER,    // Użytkownik bazy danych
    password: process.env.DB_PASSWORD,  // Hasło bazy danych
    database: process.env.DB_DATABASE,  // Nazwa bazy danych
    port: process.env.DB_PORT      // Port
});

// Połączenie z bazą danych
db.connect(err => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err.stack);
        return;
    }
    console.log('Połączono z bazą danych');
});

// Pozwól na dostęp do plików statycznych, np. plików frontendowych
app.use(express.static('public'));

// Obsługa żądania GET dla danych
app.get('/getData', (req, res) => {
    const caliber = req.query.caliber || '';
    const dateFilter = req.query.dateFilter === 'true';

    let sql = "SELECT caliber, shop, link, product_name, price, available, date_updated FROM produkty WHERE caliber = ?";
    if (dateFilter) {
        sql += " AND date_updated >= NOW() - INTERVAL 1 DAY";
    }

    db.query(sql, [caliber], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Błąd serwera');
            return;
        }
        res.json(results);
    });
});

// Uruchomienie serwera
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
