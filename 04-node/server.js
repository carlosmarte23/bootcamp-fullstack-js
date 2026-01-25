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
  const { method, url, headers } = req;
  const { pathname, searchParams } = new URL(url, `http://${headers.host}`);

  console.log(`Petición recibida:`, method, pathname);

  if (method === "GET") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    if (pathname === "/") {
      return res.end("Hola desde tu primer servidor de Node.js 🔥 👍🏾");
    }

    if (pathname === "/users") {
      const limit = Number(searchParams.get("limit")) || users.length;
      const offset = Number(searchParams.get("offset")) || 0;

      if (isNaN(limit) || isNaN(offset)) {
        return sendJson(res, 400, {
          message: "Limit and offset must be numbers",
        });
      }

      const paginatedUsers = users.slice(offset, offset + limit);

      return sendJson(res, 200, { paginatedUsers });
    }

    if (pathname === "/health") {
      return sendJson(res, 200, { status: "ok", uptime: uptime() });
    }

    return sendJson(res, 404, { message: "Not found" });
  } else if (method === "POST") {
    if (pathname === "/users") {
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
