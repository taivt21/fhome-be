const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Import middlewares
const authenticate = require('./middlewares/authenticate');
const authorize = require('./middlewares/authorize');
const errorHandler = require('./middlewares/errorHandler');

// Set up Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const setSwaggerUI = require('./utils/swagger');

// Call setSwaggerUI to set up Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Set up routes
app.use('/', userRoutes);
app.use('/', authRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/users', authenticate, authorize(['admin']), userRoutes);

// Set up error handling middleware
app.use(errorHandler);

module.exports = app;
