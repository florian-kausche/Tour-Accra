// const express = require('express');
// const swaggerDocs = require('./swagger'); // Path to the configuration file
// const swaggerUi = require('swagger-ui-express');
// const postsRoutes = require('./routes/posts');

// const server = express();

// // Swagger options
// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'API Documentation',
//       version: '1.0.0',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000',
//       },
//     ],
//   },
//   apis: ['./routes/index.js'], // Adjust this path as needed
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Use your routes
// app.use('/api', postsRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
//   console.log(`Swagger docs available at http://localhost:${PORT}/swagger`);
// });

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     responses:
 *       200:
 *         description: A list of posts
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 * 
 * /posts/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single post
 *   put:
 *     summary: Update a post by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 *   delete:
 *     summary: Delete a post by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Post deleted
 */
