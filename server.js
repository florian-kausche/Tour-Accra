const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Register auth routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Add the error handler here
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};

app.use(errorHandler);

// Swagger configuration
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
      {
        url: 'https://tour-accra.onrender.com',
      },
    ]
    
  },
  apis: ['./controllers/places.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware for routes defined in './routes'
app.use('/', require('./routes'));

// Serve the login page
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Get the port from the environment variable or default to 3000
const port = process.env.PORT || 3000;

// Initialize database connection and start the server
const startServer = async () => {
  try {
    await mongodb.initDb(); // Assuming initDb returns a promise
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit with failure if the database doesn't connect
  }
};

startServer();