const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    console.log("Token tidak ada");
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_default_secret_key", (err, user) => {
    if (err) {
      console.log("Token tidak valid");
      return res.sendStatus(403); 
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
