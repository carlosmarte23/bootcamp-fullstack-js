import http from "node:http";

process.loadEnvFile();
const port = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  console.log(`Petición recibida:`, req.method, req.url);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  if (req.url === "/") {
    return res.end("Hola desde tu primer servidor de Node.js 🔥 👍🏾");
  }

  if (req.url === "/users") {
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ name: "John", lastName: "Doe", age: 30 }));
  }

  res.statusCode = 404;
  return res.end("404 Not Found");
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
