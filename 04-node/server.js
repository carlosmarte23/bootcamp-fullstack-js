import http from "node:http";

const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`Petición recibida:`, req.method, req.url);
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("Hola desde tu primer servidor de Node.js 🔥 👍🏾");
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
