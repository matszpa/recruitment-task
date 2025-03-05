const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth && (auth === process.env.secretauth || auth === "secret")) {
    next();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
