const PORT = 1338;
const { application } = require('express');
const express = require('express');
const morgan = require('morgan');
const server = express();
const apiRouter = require('./api');

server.use(morgan('dev'));

server.use(express.json());

server.use('/api', apiRouter);

// server.use((req, res, next) => {
//     console.log("<____Body Logger START___>");
//     console.log(req.body);
//     console.log("<____Body Logger END___>");
// })

const {client} = require('./db');
client.connect();

server.listen(PORT, () => {
    console.log("The server is up on port", PORT);
})