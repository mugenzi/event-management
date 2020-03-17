const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema

let Guest = new Schema({
   firstname: String,
   lastname: String,
   email: String,
   phone: String,
   status: String
}, {
   collection: 'events'
})

module.exports = mongoose.model('Guest', Guest)
 