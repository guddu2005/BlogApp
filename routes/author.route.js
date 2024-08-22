const express = require("express");
// const passport = require("passport");

const authorController = require("../controllers/author.controller");

const authRouter = express.Router();

authRouter.post("/" , authorController.handleAuthorSignup);
authRouter.post("/login" , authorController.handleAuthorLogin);
authRouter.get("/logout" ,authorController.handleLogOut)


module.exports = {
  authRouter,
};










































































// authRouter.get("/login", (req, res) => {
//   res.render("login");
// });

// authRouter.post(
//   "/login",
//   passport.authenticate("local-login", {
//     successRedirect: "/blog",
//     failureRedirect: "/auth/signup",
//     failureFlash: true,
//   })
// );

// authRouter.get("/signup", (req, res) => {
//   res.render("signup");
// });

// authRouter.post(
//   "/signup",
//   passport.authenticate("local-signup", {
//     successRedirect: "/blog",
//     failureRedirect: "/auth/signup",
//     failureFlash: true,
//   })
// );

// authRouter.get("/logout", (req, res) => {
//   req.logout();
//   req.flash("success_msg", "You are logged out");
//   res.redirect("/auth/login");
// });
