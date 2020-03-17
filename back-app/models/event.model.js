
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
   name: String,
   eventDate: String,
   eventType: String,
   eventStatus: String,
   eventVenue: {
       location: {
          lat: String,
          long:String
       },
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
   collection: 'events'
})

module.exports = mongoose.model('Event', Event)
 