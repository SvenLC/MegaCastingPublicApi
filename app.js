const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 4000;

const offreRoutes = require('./routes/offreCasting');
const authRoutes = require('./routes/auth');

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Acces-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/offreCastings', offreRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.listen(port, () => {
    var datetime = new Date();
    var message = "Server runnning on Port: " + port + " Started at :- " + datetime;
    console.log(message);
});

module.exports = app;