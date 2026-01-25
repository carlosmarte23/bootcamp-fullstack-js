import http from "node:http";
import { uptime } from "node:process";

process.loadEnvFile();
const port = process.env.PORT ?? 3000;

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  console.log(`Petición recibida:`, req.method, req.url);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  if (req.url === "/") {
    return res.end("Hola desde tu primer servidor de Node.js 🔥 👍🏾");
  }

  if (req.url === "/users") {
    return sendJson(res, 200, { name: "John", lastName: "Doe", age: 30 });
  }

  if (req.url === "/health") {
    return sendJson(res, 200, { status: "ok", uptime: uptime() });
  }

  return sendJson(res, 404, { message: "Not found" });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
