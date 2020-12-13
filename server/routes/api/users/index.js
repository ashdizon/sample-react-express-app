const express = require('express');
const guard = require('../../guard');
const router = express.Router();

// create new user
router.post('/', (req, res) => {
    res.end();
})

// update user
router.put('/', guard, (req, res) => {
    res.end();
})

// delete user
router.delete('/', guard, (req, res) => {
    res.end();
})

module.exports = {router}