'use strict';

const path = require('path');
const oas3Tools = require('oas3-tools');
const router = require('express').Router();

// swaggerRouter configuration
const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const app = expressAppConfig.getApp();

// Initialize the Swagger middleware
router.use('/', app);

module.exports = router;
