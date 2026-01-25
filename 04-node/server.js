import { randomUUID } from "node:crypto";
import http from "node:http";
import { uptime } from "node:process";
import { json } from "node:stream/consumers";

process.loadEnvFile();
const port = process.env.PORT ?? 3000;

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify(data));
}

let users = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Midu",
  },
];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  console.log(`Petición recibida:`, method, url);

  if (method === "GET") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    if (url === "/") {
      return res.end("Hola desde tu primer servidor de Node.js 🔥 👍🏾");
    }

    if (url === "/users") {
      return sendJson(res, 200, { users });
    }

    if (req.url === "/health") {
      return sendJson(res, 200, { status: "ok", uptime: uptime() });
    }

    return sendJson(res, 404, { message: "Not found" });
  } else if (method === "POST") {
    if (req.url === "/users") {
      const body = await json(req);

      if (!body || !body.name) {
        return sendJson(res, 400, { message: "Name is required" });
      }

      const newUser = {
        id: randomUUID(),
        name: body.name,
      };
      users.push(newUser);
      return sendJson(res, 201, { message: "User created" });
    }
  } else {
    return sendJson(res, 405, { message: "Method not allowed" });
  }
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
