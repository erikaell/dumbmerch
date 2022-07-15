require("dotenv").config();
const express = require('express')

const cors = require('cors');

// import package socket.io
const http = require('http')
const {Server} = require('socket.io')

// Get routes to the variabel
const router = require('./src/routes')

const app = express()

// add after app initialization
const server = http.createServer(app)
const io = new Server(server, {
 cors: {
   origin: 'http://localhost:3000' // define client origin if both client and server have different origin
 }
})

// import socket function and call with parameter io
require('./src/socket')(io);

const port = 5000

app.use(express.json())
app.use(cors())

// Add endpoint grouping and router
app.use('/api/v1/', router)
// add route here to serving static file
app.use('/uploads', express.static('uploads'))

// change app to server
server.listen(port, () => console.log(`Listening on port ${port}!`))