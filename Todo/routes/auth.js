var express = require("express")
var router = express.Router();
var fuser = require("../models/user")
var bcrypt = require("bcryptjs")
var passport = require("passport")
var controllers = require("../controllers/auth")
var middlewares = require("../middlewares/index")


router.get("/", function(req, res) {
    res.redirect("/login")
})

//Register user-Display registration form
router.get("/register", middlewares.isAlreadyLogedin, controllers.registerForm)

//Create new user
router.post("/register", middlewares.isAlreadyLogedin, controllers.createUser)

//Display Login form
router.get("/login", middlewares.isAlreadyLogedin, controllers.loginForm)

//Login user
router.post("/login", middlewares.isAlreadyLogedin, controllers.loginUser)

//Logout user
router.get("/logout", controllers.logoutUser)

module.exports = router