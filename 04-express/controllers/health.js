export const getHealth = (req, res) => {
  return res.json({
    status: "ok",
    uptime: process.uptime(),
  });
};
