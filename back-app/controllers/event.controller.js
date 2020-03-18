
const Event = require('../models/event.model');

//CREATE EVENT
exports.event_create = function (req, res) {
  let eventObject = {
    "name": req.body.name,
    "eventDate": req.body.eventDate,
    "eventType": req.body.eventType,
    "eventStatus": req.body.eventStatus,
    "eventVenue": {
        "location": {
            "lat": req.body.lat,
            "long": req.body.long
        },
        "address": {
          "street": req.body.street,
            "city": req.body.city,
            "state": req.body.state,
            "zipcode":req.body.zipcode
        }
    }
 }
    Event.create(eventObject, (error, data) => {

        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
};


//GET ALL EVENTS
exports.event_all = function(req, res){
    Event.find((error, data)=>{
        if(error){
          return next(error)
        }else{
            res.json(data)
        }
    })
};

//UPDDATE EVENT
exports.event_update = function (req, res) {
  console.log("test")
    Event.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, event) {

        if (err) {

          return next(err);
        }
        res.send('Event udpated.');
    });
};





// exports.test = function (req, res) {
//     res.send('Greetings from the Test controller!');
// };

// exports.event_find = function (req, res) {
//     Event.findById(req.params.id, function (err, event) {
//         if (err) return next(err);
//         res.send(event);
//     })
// };



// // exports.guest_all = function (req, res) {
// //     Guest.find((error, data) => {
// //         if (error) {
// //           return next(error)
// //         } else {
// //           res.json(data)
// //         }
// //       })
// // };



// // exports.guest_details = function (req, res) {
// //     Guest.findById(req.params.id, function (err, guest) {
// //         if (err) return next(err);
// //         res.send(guest);
// //     })
// // };


// // exports.guest_update = function (req, res) {
// //     Guest.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, guest) {
// //         if (err) return next(err);
// //         res.send('Guest udpated.');
// //     });
// // };

// // exports.guest_delete = function (req, res) {
// //     Guest.findByIdAndRemove(req.params.id, function (err) {
// //         if (err) return next(err);
// //         res.send('Deleted successfully!');
// //     })
// // };

