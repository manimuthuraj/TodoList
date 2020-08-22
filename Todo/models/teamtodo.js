var mongoose = require("mongoose")

var teamtodoSchema = new mongoose.Schema({
    task_name: { type: String, required: true },
    created_date: {
        type: Date,
        default: Date.now
    },
    edited_date: {
        type: Date
    },
    expiry: {
        type: Date,
        required: true
    },
    completion: { type: String, default: "pending", enum: ["pending", "completed"] },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "fuser"
        },
        username: String
    }
})

module.exports = mongoose.model("teamtodo", teamtodoSchema)