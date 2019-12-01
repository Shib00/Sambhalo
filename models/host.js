const mongoose = require("mongoose");

let hostSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    contact: {type: String, unique: true, required: true},
    address: String,
    secretToken: String,
    active: Boolean
});

module.exports = mongoose.model("Host", hostSchema);