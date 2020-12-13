const express = require('express');
const router = express.Router();

/**
 * This code will auto load all the controllers under the api folder,
 * make sure there is an index.js file in the folder that exports an express.Router
 */
const { readdirSync, statSync } = require('fs')
const { join } = require('path')

const dirs = readdirSync('./server/routes/api').filter(f => statSync(join('./server/routes/api', f)).isDirectory())

dirs.forEach(dir => {
    const api = require(`./${dir}`);
    
    if(api.guard) {
        router.use(`/${dir}/`, api.guard, api.router);
    }else {
        router.use(`/${dir}/`, api.router);
    }
})

module.exports = router;