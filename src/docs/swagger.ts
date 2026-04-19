import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "URL Shortener API",
      version: "1.0.0",
      description: "A simple URL shortener built with Express, TypeScript, and Prisma"
    },
    servers: [
      {
        url: "http://localhost:9000",
        description: "Local server"
      }
    ],
    components: {
      schemas: {
        Url: {
          type: "object",
          properties: {
            id: { type: "integer" },
            shortCode: { type: "string" },
            originalUrl: { type: "string" },
            clickCount: { type: "integer" }
          }
        },

        ApiResponse: {
          type: "object",
          properties: {
            status: { type: "string" },
            message: { type: "string" },
            data: { type: "object" }
          }
        }
      }
    }
  },

  apis: ["./src/routes/*.ts"]
});