function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/login');
}

function isAdmin(req, res, next) {
  if (req.session.isAdmin) return next();
  res.redirect('/tasks');
}

module.exports = { isAuthenticated, isAdmin };
