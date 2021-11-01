const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.Port || '3000';
app.listen(port, () => console.log(`http://localhost:${port}`))