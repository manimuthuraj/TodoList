var fuser = require("../models/user")
var teamtodo = require("../models/teamtodo")

var allTeamtodo = async function(req, res) {
    try {
        var nonExpriedtodo = await teamtodo.find({ expiry: { $gte: new Date() } })
        var expriedTodo = await teamtodo.find({ expiry: { $lte: new Date() } })
        res.render("teamtodo/teamtodo", { todo: nonExpriedtodo, todoexpried: expriedTodo })
    } catch (e) {
        console.log(e)
        req.flash("error", "Some thing went wrong")
        res.redirect("/todo")
    }
}

var addTeamtodo = function(req, res) {
    res.render("teamtodo/newTodo")
}

var createTeamtodo = async function(req, res) {
    try {
        var d = new Date(req.body.expiry + "T" + req.body.time)
        var todoList = { task_name: req.body.task_name, expiry: d, user: { id: req.user._id, username: req.user.username } }
        var createTodo = await teamtodo.create(todoList)
        res.redirect("/teamtodo")
    } catch (e) {
        console.log(e)
        req.flash("error", "Some thing went wrong")
        res.redirect("/teamtodo")
    }
}

var editTeamtodo = async function(req, res) {
    try {
        var todos = await teamtodo.findById(req.params.id)
        var d = todos.expiry
        var month = d.getMonth() + 1
        var date = d.getFullYear() + "-0" + month + "-" + d.getDate()
        res.render("teamtodo/editTodo", { todo: todos, date: date })
    } catch (e) {
        console.log(e)
        req.flash("error", "Some thing went wrong")
        res.redirect("/teamtodo")
    }
}

var updateTeamtodo = async function(req, res) {
    try {
        var d = new Date(req.body.expiry + "T" + req.body.time)
        var todoList = { task_name: req.body.task_name, expiry: d, completion: req.body.completion }
        var updateTodo = await teamtodo.findByIdAndUpdate(req.params.id, todoList)
        res.redirect("/teamtodo")
    } catch (e) {
        console.log(e)
        req.flash("error", "Some thing went wrong")
        res.redirect("/teamtodo")
    }
}

var deleteTeamtodo = async function(req, res) {
    try {
        var deleteTodo = await teamtodo.findByIdAndRemove(req.params.id)
        res.redirect("/teamtodo")
    } catch (e) {
        console.log(e)
        req.flash("error", "Somethig went wrong")
        res.redirect("/teamtodo")
    }
}
module.exports = { allTeamtodo, addTeamtodo, createTeamtodo, editTeamtodo, updateTeamtodo, deleteTeamtodo }