const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// const cors = require('cors');
// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postingRoutes = require('./routes/postingRoutes')
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
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.status(200).send();
  next();
})
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/',postingRoutes)

// app.use(cors());

// // đối với tên miền hoặc cổng cụ thể
// app.use(cors({
//   origin: 'http://localhost:8000/home'
// }));
// app.use('/api/auth', authRoutes);
// app.use('/api/users', authenticate, authorize(['admin']), userRoutes);

// Set up error handling middleware
// app.use(errorHandler);

module.exports = app;
