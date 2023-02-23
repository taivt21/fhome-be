const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for managing user information',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};
// const setSwaggerUI = (app, swaggerUi, swaggerDocument) => {
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// };

// module.exports = {
//   setSwaggerUI,
// };

const specs = swaggerJsdoc(options);

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

// module.exports = {
//   setSwaggerUI: (app, swaggerUi, swaggerDocument) => {
//     app.use('/api-docs', swaggerUi.serve);
//     app.get('/api-docs', swaggerUi.setup(swaggerDocument));
//   },
// };
