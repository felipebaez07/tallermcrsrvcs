const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Servir el frontend estático (mismo origen que la API, sin problemas de CORS)
app.use(express.static(path.join(__dirname, "public")));

// Configurar proxies para redirigir tráfico a los microservicios
app.use("/register", createProxyMiddleware({ target: "http://localhost:4001", changeOrigin: true }));
app.use("/users", createProxyMiddleware({ target: "http://localhost:4001", changeOrigin: true }));
app.use("/products", createProxyMiddleware({ target: "http://localhost:4002", changeOrigin: true }));
app.use("/orders", createProxyMiddleware({ target: "http://localhost:4003", changeOrigin: true }));

app.listen(3001, () => {
  console.log("🚀 API Gateway corriendo en http://localhost:3001");
});
