import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book & Library Management API',
      version: '1.0.0',
      description: 'Book Management API developed using Node.js, Express, TypeScript, PostgreSQL, and MongoDB'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  // Hem geliştirme ortamındaki (.ts) hem derlenmiş dist klasöründeki (.js) route'ları tarar
  apis: [
    './src/routes/*.ts',
    './dist/routes/*.js',
    './routes/*.js'
  ]
};

export const swaggerSpec = swaggerJSDoc(options);