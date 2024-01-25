const Jwt = require("jsonwebtoken");

const secret = "$uperMan@123";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    ProfielImageURL: user.ProfielImageURL,
    role: user.role,
  };
  const token = Jwt.sign(payload, secret);
  return token;
}
function validateToken(token) {
  const payload = Jwt.verify(token, secret);
  return payload;
}
module.exports = {
  createTokenForUser,
  validateToken,
};
