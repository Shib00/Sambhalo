const mongoose = require("mongoose");

let feedbackSchema = new mongoose.Schema({
    name: {type: String, required: true},
    hostName: {type: String, required: true},
    email: {type: String, required: true},
    fullFill: {type: String, required: true},
    attitudeHost: {type: String, required: true},
    timing: {type: String, required: true},
    other: {type: String}
});

module.exports = mongoose.model("Feedback", feedbackSchema);