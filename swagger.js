const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const setupSwagger = (app) => {
  // Swagger options
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Accra Tour API',
        version: '1.0.0',
        description: 'API for managing places to visit in Accra',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
      components: {
        securitySchemes: {
          oauth2: {
            type: 'oauth2',
            flows: {
              authorizationCode: {
                authorizationUrl: 'https://github.com/login/oauth/authorize',
                tokenUrl: 'https://github.com/login/oauth/access_token',
                scopes: {
                  'user:email': 'Access user email',
                },
              },
            },
          },
        },
      },
    },
    apis: ['./controllers/places.js', './routes/auth.js'], // Ensure this path is correct
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // Add authentication routes for Swagger
  app.use('/api-docs/auth', require('./routes/swaggerAuth'));
};

module.exports = setupSwagger;
