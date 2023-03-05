"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser'); // const cors = require('cors');
// Import routes


var authRoutes = require('./routes/authRoutes');

var userRoutes = require('./routes/userRoutes');

var postingRoutes = require('./routes/postingRoutes');

var roomRoutes = require('./routes/roomRoutes');

var buildingRoutes = require('./routes/buildingRoutes.js'); // Import middlewares
// const authenticate = require('./middlewares/authenticate');


var authorize = require('./middlewares/authorize'); // const errorHandler = require('./middlewares/errorHandler');
// Set up Swagger UI


var swaggerUi = require('swagger-ui-express');

var swaggerDocument = require('./swagger.json');

var setSwaggerUI = require('./utils/swagger'); // Call setSwaggerUI to set up Swagger UI


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Body parser middleware

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // Set up routes

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', postingRoutes);
app.use('/', roomRoutes);
app.use('/', buildingRoutes);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.status(200).send();
  next();
});
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', postingRoutes); // app.use(cors());
// Set up error handling middleware
// app.use(errorHandler);
// app.use(function(req, res, next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// })

module.exports = app;