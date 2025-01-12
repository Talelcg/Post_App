import app from './app';
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV == "development") {
 const options = {
 definition: {
 openapi: "3.0.0",
 info: {
 title: "Web Dev 2022 REST API",
 version: "1.0.0",
 description: "REST server including authentication using JWT",
 },
 servers: [{url: "http://localhost:3000",},]
 ,
 components: {
    schemas: {
      Post: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "string" },
          userId: { type: "string" },
        },
      },
      PostInput: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "string" },
        },
        required: ["title", "content"],
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
},
 apis: ["./src/routes/*.ts"],};
 const specs = swaggerJsDoc(options);
 app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
