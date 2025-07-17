const jwt = require("jsonwebtoken");
const SECRET = "jwt_secret";

exports.createToken = (user) => {
  return jwt.sign(
    { email: user.email, role: user.role },
      SECRET,
    { expiresIn: "2h" }
  );
};

