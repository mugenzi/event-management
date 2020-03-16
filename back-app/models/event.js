const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema

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
   }
}, {
   collection: 'events'
})

module.exports = mongoose.model('Event', Event)
 