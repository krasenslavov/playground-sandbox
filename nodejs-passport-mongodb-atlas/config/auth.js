module.exports = {
  ensureAuthenicated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash(
      "error_message",
      "Access deined! Need to login to view this page"
    );
    res.redirect("/users/login");
  },
};
