var express = require("express")
var app = express()
var bodyparse = require("body-parser")
app.use(express.static(__dirname + "/public"));
var methodOverride = require("method-override")
app.use(methodOverride("_method"))
var flash = require('connect-flash')
app.use(flash())

app.use(bodyparse.urlencoded({ extended: true }))
app.set("view engine", "ejs")

//db configuration
require("./config/dbconnection")

//Routes
var authRoute = require("./routes/auth")
var todoRoute = require("./routes/todo")
var teamRoute = require("./routes/teamtodo")

//passport configuration
require("./config/passportconfig")(app)

//Using routes
app.use(authRoute)
app.use(todoRoute)
app.use(teamRoute)

//server listening
app.listen(process.env.PORT || 3000, function() {
    console.log("started")
})