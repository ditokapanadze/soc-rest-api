const { contentSecurityPolicy } = require("helmet");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.config = decoded;

    next();
  } catch (err) {
    res.status(400).send("invalid token");
  }
};

module.exports = auth;
