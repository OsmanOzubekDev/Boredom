import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book & Library Management API',
      version: '1.0.0',
      description: 'Node.js, Express, TypeScript ve PostgreSQL ile geliştirilmiş Kitap Yönetim API\'si'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Yerel Sunucu'
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
  apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);