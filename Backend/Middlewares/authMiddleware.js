const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.send({ message: "Authentication Error", success: false });
    } else {
      req.body.userId = decode.id;
      next();
    }
  });
};
