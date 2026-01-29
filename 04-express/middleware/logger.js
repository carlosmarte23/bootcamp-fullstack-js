export function logger(req, res, next) {
  const start = Date.now();
  console.log("--- Nueva petición recibida ---");

  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`,
    );
  });

  next();
}
