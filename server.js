const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')
const winston = require('winston')
const morgan = require('morgan')
const http = require('http')

const app = express()
const port = 3000

// Load .env variables
require('dotenv').config()

// Use middleware CORS, to automatically set Access-Control-Allow-Origin header
const corsOptions = {
  origin: 'https://ammo.kobiela.click',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Winston/morgan logger settings
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

logger.stream = {
  write: function (message) {
    logger.info(message.trim())
  }
}

// Use morgan to save logs to files
app.use(morgan('combined', { stream: logger.stream }))

// Database connection config, using environment variables
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
})

// Public folder with webpage
app.use(express.static(path.join(__dirname)))

// Main route with info about endpoints
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Route with informations about api
app.get('/api', (req, res) => {
  res.send(`
        <h1>Database connection API server - amunicja_pomorskie_frontend</h1>
        <p>Available endpoints:</p>
        <ul>
            <li><strong>GET</strong> /getData - Downloading data based on the caliber parameter - example: /getData?caliber=9x19</li>
        </ul>
    `)
})

app.get('/status', (req, res) => {
  // Check if the main page ("/") is available
  const options = {
    host: 'localhost',
    port: port,
    path: '/',
    timeout: 2000
  }

  // Check for webserver availability
  const request = http.get(options, (response) => {
    const mainPageStatus = response.statusCode === 200 ? 'ACTIVE' : 'INACTIVE'

    pool.getConnection((err, connection) => {
      const dbStatus = err ? 'INACTIVE' : 'ACTIVE'
      if (connection) connection.release()

      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify({
        'Main page status': mainPageStatus,
        'Database connection': dbStatus
      }, null, 2)) // The 2 here adds indentation for better readability
    })
  })

  request.on('error', () => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify({
      'Main page status': 'ERROR',
      'Database connection': 'ERROR'
    }, null, 2))
  })

  request.end()
})

// Handling GET request for data retrival from database
app.get('/getData', (req, res) => {
  const caliber = req.query.caliber || ''
  const dateFilter = req.query.dateFilter === 'true'

  const tableName = process.env.DB_TABLE
  let sql = `SELECT caliber, shop, link, product_name, price, available, date_updated FROM ${tableName} WHERE caliber = ?`
  if (dateFilter) {
    sql += ' AND date_updated >= NOW() - INTERVAL 1 DAY'
  }

  // Use the pool to execute the query
  pool.query(sql, [caliber], (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Server error.')
      return
    }
    res.json(results)
  })
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
