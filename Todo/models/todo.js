var mongoose = require("mongoose")

var todoSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "fuser"
    }
})

module.exports = mongoose.model("todo", todoSchema)