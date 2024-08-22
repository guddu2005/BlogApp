const { v4: uuidv4 } = require("uuid");
const { Author } = require("../models/author.model"); // Ensure this path is correct
const bcrypt = require('bcrypt');
const { setUser } = require("../service/auth");

const handleAuthorSignup = async (req, res) => {
    const { email, name, password } = req.body;

    if (!name || !email || !password) {
        return res.render("signup", { error: "all fields are Required" })
    }
    try {
        const newUser = new Author({ name, email, password });
        await newUser.save();
        res.redirect("/login");
    } catch (err) {
        console.error(`Error during user Registration:`, err);
        res.render("signup", { err })
    }

}

const handleAuthorLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.render("login", { error: "All Fields Are required" });
    }
    try {
        const user = await Author.findOne({ email });
        if (!user || user.password !== password) {
            return res.render("login", { error: "Invalid username and password" });
        }
        const token = setUser(user);
        res.cookie("gid", token);
        return res.redirect("/blog");
    } catch (err) {
        console.error(err);
        return res.render("login", { err: "Something went wrong ,Please try again" })
    }

}
const handleLogOut =(req, res)=>{
    res.clearCookie("gid");
    return res.redirect("/");
}

module.exports = {
    handleAuthorLogin,
    handleAuthorSignup,
    handleLogOut
};
