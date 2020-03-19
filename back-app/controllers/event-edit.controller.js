
const Event = require('../models/event.model');

//UPDDATE EVENT
exports.event_update = function (req, res) {
  console.log("Ready to update event")
    Event.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, event) {
      
        if (err) {
          
          return next(err);
        }
        res.send('Event udpated.');
    });
};

 