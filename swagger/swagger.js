// const express = require('express');
// const app = express();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.yaml');

// var options = {
//   explorer: true
// };

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


const swaggerUi = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, '/swagger.yaml'));
const router = require('express').Router();
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
swaggerDocument.host=config.base_url;
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;