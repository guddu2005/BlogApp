const { getUser } = require("../service/auth");

async function restrictToLoggedUserOnly(req, res, next) {
    const userUid = req.cookies?.gid;
    if (!userUid) return res.redirect("/login");

    try {
        const user = await getUser(userUid);
        console.log(user);
        if (!user) return res.redirect("/login");

        req.user = user || null;
        next();
    } catch (error) {
        console.error('Error in restrictToLoggedUserOnly:', error);
        return res.redirect("/login");
    }
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.gid;

    try {
        const user = await getUser(userUid);
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in checkAuth:', error);
        req.user = null;
        next();
    }
}

module.exports = {
    restrictToLoggedUserOnly,
    checkAuth,
};
