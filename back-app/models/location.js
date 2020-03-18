const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema

let Location = new Schema({
    lat: Number,
    long:Number
}, {
   collection: 'location'
})

module.exports = mongoose.model('Location', Location)
 