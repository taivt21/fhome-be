const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Import middlewares
const authenticate = require('./middlewares/authenticate');
const authorize = require('./middlewares/authorize');
// const errorHandler = require('./middlewares/errorHandler');

// Set up Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const setSwaggerUI = require('./utils/swagger');

// Call setSwaggerUI to set up Swagger UI
setSwaggerUI(app, swaggerUi, swaggerDocument);

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Set up routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use(cors());

// đối với tên miền hoặc cổng cụ thể
app.use(cors({
  origin: 'http://localhost:8000/home'
}));
// app.use('/api/auth', authRoutes);
// app.use('/api/users', authenticate, authorize(['admin']), userRoutes);

// Set up error handling middleware
// app.use(errorHandler);

module.exports = app;
