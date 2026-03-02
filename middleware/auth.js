function isAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.status(403).send('Forbidden');
}

module.exports = { isAdmin };
