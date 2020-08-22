var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var fuserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    created_date: {
        type: Date,
        default: Date.now
    },
})
fuserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("fuser", fuserSchema)