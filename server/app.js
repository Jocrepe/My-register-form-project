const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 8000

let conn = null
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port : 3306,
    database: 'register_listv2'
  })
}

app.post('/user', async (req,res) => {
    try {
        let newUser = req.body
        const results = await conn.query('INSERT INTO users SET ?', newUser)
        res.json({
            message: 'Insert complete',
            data: results
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

app.listen(port, async () => {
    await initMySQL()
    console.log('HTTP server is running')
})