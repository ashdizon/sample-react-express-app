const express = require('express');
const router = express.Router();
const guard = require('../../guard');
const authService = require('./auth-service');
const logger = require('../../../services/logging');

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    authService.login(username, password)
    .then(token => res.json(token))
    .catch(e => {
        logger.log(e);
        res.status(400);
        res.end();
    })
});


router.post('/logout', guard, (req, res) => {
    authService.logout(req.user.id)
    .then(success => res.json({success}))
    .catch(e => {
        logger.log(e);
        res.status(400);
        res.end();
    })
})


module.exports = {router}