var teamtodo = require("../models/teamtodo")
var token = require("../helpers/token");
const Token = require("../helpers/token");


//Checking Todo list ownership in team todo only owner can edit or delete
function checkTodoOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        teamtodo.findById(req.params.id, function(err, foundTodo) {
            if (err) {
                res.redirect("/teamtodo")
            } else {
                if (foundTodo.user.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You were not owner of this todo")
                    res.redirect("/teamtodo")
                }
            }
        })
    } else {
        req.flash("error", "Please login")
        res.redirect("/login")
    }
}

//Checkking is logged in or not and also checking y
function isLoggedInandJWT(req, res, next) {
    if (req.isAuthenticated()) {
        var tokenid = Token.tokenGenerator(req.user.username)
        var verify = Token.tokenValitaor(tokenid)
        if (verify) {
            return next();
        } else {
            req.flash("error", "JWT failed or unauthorized")
            res.redirect("/todo")
        }
    }
    req.flash("error", "Please login")
    res.redirect("/login")
}

//checing logedin or not and if yes restricting from registration and login page
async function isAlreadyLogedin(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/todo")
    }
    next()
}

module.exports = { checkTodoOwnership, isLoggedInandJWT, isAlreadyLogedin }