var express = require("express")
var router = express.Router();
var fuser = require("../models/user")
var todo = require("../models/todo")
var controllers = require("../controllers/todo")
var middlewares = require("../middlewares/index")

//Display all todo list of user
router.get("/todo", middlewares.isLoggedInandJWT, controllers.allTodo)

//Add a new todo list-Displaying form to add todo
router.get("/todo/add", middlewares.isLoggedInandJWT, controllers.addTodo)

//Create a new todo
router.post("/todo", middlewares.isLoggedInandJWT, controllers.createTodo)

//Edit a todo-Displaying form to edit
router.get("/todo/:id/edit", middlewares.isLoggedInandJWT, controllers.editTodo)

//Update a todo list of user
router.put("/todo/:id", middlewares.isLoggedInandJWT, controllers.updateTodo)

//Delete a todo list 
router.delete("/todo/:id", middlewares.isLoggedInandJWT, controllers.deleteTodo)

module.exports = router