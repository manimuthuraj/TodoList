var express = require("express")
var router = express.Router();
var fuser = require("../models/user")
var teamtodo = require("../models/teamtodo")
var controllers = require("../controllers/teamtodo")
var middlewares = require("../middlewares/index")

//Display All team todo lists
router.get("/teamtodo", middlewares.isLoggedInandJWT, controllers.allTeamtodo)

//Add a new todo to team-Displaying form to add new todo
router.get("/teamtodo/add", middlewares.isLoggedInandJWT, controllers.addTeamtodo)

//create a new team todo
router.post("/teamtodo", middlewares.isLoggedInandJWT, controllers.createTeamtodo)

//Edit a team todo-Displaying Form to edit,Checking Todo list ownership in team todo only owner can edit
router.get("/teamtodo/:id/edit", middlewares.checkTodoOwnership, controllers.editTeamtodo)

//Update a team todo based on id, Checking Todo list ownership in team todo only owner can edit 
router.put("/teamtodo/:id", middlewares.checkTodoOwnership, controllers.updateTeamtodo)

//Delete a team todo, Checking Todo list ownership in team todo only owner can delete
router.delete("/teamtodo/:id", middlewares.checkTodoOwnership, controllers.deleteTeamtodo)

module.exports = router