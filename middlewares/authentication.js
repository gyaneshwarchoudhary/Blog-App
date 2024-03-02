const { validateToken } = require("../services/authentication");

function checkForAuthentificationCookie(cookieName) {
  return (req, res, next) => {
    const TokenCookieValue = req.cookies[cookieName];
    if (!TokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(TokenCookieValue);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
}

module.exports = {
  checkForAuthentificationCookie,
};
