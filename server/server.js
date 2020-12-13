require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes'); // import all routes

const crypto = require('crypto');
const rng = crypto.randomBytes(256/8);
process.env.JWT = rng;

routes(app); // add routes

const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`API Server running on port ${port}`));