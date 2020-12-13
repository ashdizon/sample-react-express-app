const express = require('express');
const router = express.Router();
const path = require('path');

/**
 * This is used for production,
 * In development all requests for react files will be served from the react dev server
 */

if(process.env.NODE_ENV === 'production') {
    router.use('/static', express.static(path.join(__dirname, '../../../client/build/static'))); //react bundled files
    router.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../../client/build/index.html'))); // everything else hit the react app
}

module.exports = router;