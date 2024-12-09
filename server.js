const express = require('express');
const mongodb = require('./data/database'); // Import the 'database' module
const bodyParser = require('body-parser'); // Optional, if required
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors'); // Import CORS
require('dotenv').config(); // Load environment variables (optional if using .env)

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Accra Tour Api',
      version: '1.0.0',
      description: 'API for managing tasks places to visit in Accra',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/index.js', './controllers/places.js'], // Adjust this path as needed
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware for routes defined in './routes'
app.use('/', require('./routes'));

// Get the port from the environment variable or default to 3000
const port = process.env.PORT || 3000;

// Initialize database connection and start the server
const startServer = async () => {
  try {
    // Ensure MongoDB is initialized
    await mongodb.initDb(); // Assuming initDb returns a promise
    app.listen(port, () => {
      console.log(`Server is running and node is running on port ${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit with failure if the database doesn't connect
  }
};

startServer();
