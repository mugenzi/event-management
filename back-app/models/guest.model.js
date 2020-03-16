const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema

let Guest = new Schema({
   firstName: String,
   lastName: String,
   email: String,
   phoneNumber: String,
   eventId: String 
}, {
   collection: 'guests'
})

module.exports = mongoose.model('Guest', Guest)
 