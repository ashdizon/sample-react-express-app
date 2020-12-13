const express = require('express');
const api = require('./api');
const cors = require('cors');
const react = require('./react');

// put all api routes here
module.exports = function(app) {

    // if not production, enable cors so the react server can access
    // in production the react app will be served from the api server, so this isnt needed
    if(process.env.NODE_ENV !== 'production') {
        app.use(cors());
    }

    // api routes parse json, then pass to api router
    app.use('/api', [express.json(), api]);

    // if not api endpoint, send to react
    // NOTE: this is a wildcard endpoint, so you cannot place other routers below this
    app.use(react);
}