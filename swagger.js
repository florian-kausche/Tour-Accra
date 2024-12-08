const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const setupSwagger = (app) => {
  // Swagger options
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'CSE341 Task Tracker API',
        version: '1.0.0',
        description: 'API for managing tasks',
      },
      // servers: [
      //   {
      //     url: 'https://cse341-tasktracker.onrender.com',
      //   },
      // ],
    },
    apis: ['./routes/index.js', './controllers/posts.js'], // Adjust this path as needed
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
