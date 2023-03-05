const express = require('express');
const app = express();
const bodyParser = require('body-parser')
// const cors = require('cors');
// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postingRoutes = require('./routes/postingRoutes')
const roomRoutes = require('./routes/roomRoutes')
const buildingRoutes = require('./routes/buildingRoutes.js')
const docs = require('./node-output/index')
// Import middlewares
// const authenticate = require('./middlewares/authenticate');
const authorize = require('./middlewares/authorize');
// const errorHandler = require('./middlewares/errorHandler');

// Set up Swagger UI, user /api/docs to call swagger
app.use('/api', docs);

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//set up header, put this middleware first to make sure it doesn't automatically block the router
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})
// Set up routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/',postingRoutes);
app.use('/',roomRoutes);
app.use('/',buildingRoutes);
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/',postingRoutes)

module.exports = app;
