'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello world\n');
});

app.get('/help', (req, res) => {
    res.send('The help page\n');
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
