var jwt = require("jsonwebtoken")
var JWT_KEY = "mmm"

var tokenGenerator = function(name) {
    var token = jwt.sign(name, JWT_KEY)
    return token
}

var tokenValitaor = function(token) {
    var data = jwt.verify(token, JWT_KEY)
    return data
}
module.exports = { tokenGenerator, tokenValitaor }