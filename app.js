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

// const session = require('express-session');
// const RedisStore = require('connect-redis')(session);
// const redis = require('redis');
// const client = redis.createClient();

// app.use(
//   session({
//     store: new RedisStore({ client }),
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true, maxAge: 600000 } // thời gian sống của phiên là 10 phút
//   })
// );


// Set up Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Call setSwaggerUI to set up Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set up routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/',postingRoutes);
app.use('/',roomRoutes);
app.use('/',buildingRoutes);

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})
// app.use(cors());


// Set up error handling middleware
// app.use(errorHandler);

module.exports = app;
