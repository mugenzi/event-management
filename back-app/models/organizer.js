const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Organizer', organizerSchema);