const mongoose = require("mongoose");

let visitorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    contact: {type: String, unique: true, required: true},
    checkIn: String,
    checkOut: String,
    hostId: String,
    hostName: String,
    address: String,
    secretToken: String,
    active: Boolean
});

module.exports = mongoose.model("Visitor", visitorSchema);