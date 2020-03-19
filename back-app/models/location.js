const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema

let Location = new Schema({
    name: String,
   eventDate: String,
   eventType: String,
   eventStatus: String,
   eventVenue: {
       location: [],
       address: {
         street: String,
           city: String,
           state: String,
           zipcode:String
       }
   }, 
   guests : [{
      firstname: String,
      lastname: String,
      email: String,
      phone: String,
      status: String
   }]
}, {
   collection: 'location'
})

module.exports = mongoose.model('Location', Location)
 