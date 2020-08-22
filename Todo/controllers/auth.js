var fuser = require("../models/user")
var bcrypt = require("bcryptjs")
var passport = require("passport")

var registerForm = function(req, res) {
    res.render("auth/register")
}

var createUser = async function(req, res) {
    try {
        var hashedPassword = await bcrypt.hash(req.body.password, 10) //Hasing password
        var user = { username: req.body.username, password: hashedPassword }
        var createUser = await fuser.create(user)
        req.flash("error", "Now please Login")
        res.redirect("/login")
    } catch (e) {
        console.log(e)
        req.flash("error", "Some Thing went wrong please try again or use differnt name")
        res.redirect("/register")
    }
}

var loginForm = function(req, res) {
    res.render("auth/login")
}

var loginUser = passport.authenticate("local", {
    successRedirect: "/todo",
    failureRedirect: "/login",
    failureFlash: true
})

var logoutUser = function(req, res) {
    req.logout();
    req.flash("error", "Loged Out successfully")
    res.redirect("/login")
}

module.exports = { registerForm, createUser, loginForm, loginUser, logoutUser }