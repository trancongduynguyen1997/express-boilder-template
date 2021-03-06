const { verifyJwt } = require('../../core/utils/jwt');
const { getErrorMessages } = require('../../core/errors');

module.exports = (excludes = []) => (req, res, next) => {
  if (excludes.includes(req.url)) {
    return next();
  }
  const bearer = req.headers.authorization;
  const token = bearer ? bearer.replace('Bearer ', '') : null;
  if (token) {
    const result = verifyJwt(token);
    if (result.success) {
      req.user = result.user;
      return next();
    }
    return res.status(401).send({
      success: false,
      message: result.message,
    });
  }
  const lang = req.headers.language;
  return res.status(401).send({
    success: false,
    message: getErrorMessages(4010, lang),
  });
};
