import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CodeMentor AI API",
      version: "1.0.0",
      description: "REST API documentation for CodeMentor AI Backend",
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
