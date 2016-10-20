

var authenticateUser = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.statusMessage = "Unauthorized";
    res.status(401);
    res.end();
};

module.exports = authenticateUser;
