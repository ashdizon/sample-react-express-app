const express = require('express');
const router = express.Router();
const guard = require('../../guard');
const messageService = require('./message-service');
const logger = require('../../../services/logging');

router.get('/', (req, res) => {
    const {base, num} = req.query;
    messageService.getAllMessages(base || 0, num || 25)
    .then(messages => res.json(messages))
    .catch(e => {
        logger.log(e);
        res.status(400);
        res.end();
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const {base, num} = req.query;
    messageService.getUserMessages(id, base || 0, num || 25)
    .then(messages => res.json(messages))
    .catch(e => {
        logger.log(e);
        res.status(400);
        res.end();
    });
});

router.post('/', (req, res) => {
    const {msg} = req.body;
    messageService.createMessage(req.user.id, msg)
    .then(success => res.json({success}))
    .catch(e => {
        logger.log(e);
        res.status(400);
        res.end();
    });
});

router.put('/', (req, res) => {
    const {id, msg} = req.body;
    messageService.editMessage(id, req.user.id, msg)
    .then(success => res.json({success}))
    .catch(e => {
        logger.log(e);
        res.status(400);
        res.end();
    });
});

router.delete('/', (req, res) => {
    const {id} = req.body;
    messageService.deleteMessage(id, req.user.id)
    .then(success => res.json({success}))
    .catch(e => {
        logger.log(e);
        res.status(400);
        res.end();
    });
});

// all these routes require auth b/c exported guard
module.exports = {guard, router}