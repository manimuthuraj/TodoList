var express = require("express")
var fuser = require("../models/user")
var todo = require("../models/todo")

var allTodo = async function(req, res) {
    try {
        var nonExpriedtodo = await todo.find({
            $and: [
                { expiry: { $gte: new Date() } },
                { user: req.user._id }
            ]
        })
        var expriedTodo = await todo.find({ $and: [{ expiry: { $lte: new Date() } }, { user: req.user._id }] })
        res.render("todo/todo", { todo: nonExpriedtodo, todoexpried: expriedTodo })
    } catch (e) {
        console.log(e)
        req.flash("error", "Some thing went wrong")
        res.redirect("/teamtodo")
    }
}

var addTodo = function(req, res) {
    res.render("todo/newTodo")
}

var createTodo = async function(req, res) {
    try {
        var d = new Date(req.body.expiry + "T" + req.body.time)
        var todoList = { task_name: req.body.task_name, expiry: d, user: req.user._id }
        var createTodo = await todo.create(todoList)
        res.redirect("/todo")
    } catch (e) {
        console.log(e)
        req.flash("error", "Some thing went wrong")
        res.redirect("/todo")
    }
}

var editTodo = async function(req, res) {
    try {
        var todos = await todo.findById(req.params.id)
        var d = todos.expiry
        var month = d.getMonth() + 1
        var date = d.getFullYear() + "-0" + month + "-" + d.getDate()
        res.render("todo/editTodo", { todo: todos, date: date })
    } catch (e) {
        console.log(e)
        req.flash("error", "Some thing went wrong")
        res.redirect("/todo")
    }
}

var updateTodo = async function(req, res) {
    try {
        var d = new Date(req.body.expiry + "T" + req.body.time)
        var todoList = { task_name: req.body.task_name, expiry: d, completion: req.body.completion }
        var updateTodo = await todo.findByIdAndUpdate(req.params.id, todoList)
        res.redirect("/todo")
    } catch (e) {
        console.log(e)
        req.flash("error", "Some thing went wrong")
        res.redirect("/todo")
    }
}

var deleteTodo = async function(req, res) {
    try {
        var deleteTodo = await todo.findByIdAndRemove(req.params.id)
        res.redirect("/todo")
    } catch (e) {
        console.log(e)
        req.flash("error", "Somethig went wrong")
        res.redirect("/todo")
    }
}

module.exports = { allTodo, addTodo, createTodo, editTodo, updateTodo, deleteTodo }