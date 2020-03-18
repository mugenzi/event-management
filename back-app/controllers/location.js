const Location = require('../models/location');
var mongoose = require('mongoose');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};
// GET ALL
exports.findAll = function (req, res) {
    Location.find((error,data)  => {
            if (error) {
                console.log('error to find');
            }
            else {

                res.json(data);
            }
        })
};


exports.getNearest = function (req, res) {
    const nearest = parseInt(req.params.nearest);
    const location = req.params.eventVenue.location;
    Location.find({ location: { $near: [ 41.017654,-91.9665342] } })
        .limit(nearest)
        .toArray((err, result) => {
            res.json(result);
        });
};
 
exports.getNearestTest = function (req, res) {
     
    Location.findLocation.find({ point :{ $near :{$geometry : {type : "point" ,location : [-84.27326978424058, 30.443902444762696] }}}}).pretty()
        .limit(nearest)
        .toArray((err, result) => {
            res.json(result);
        });
};
// FInd All nearest location


// // ==================================

// exports.AddLocation = function (req, res) {
//     let eventObject = {
//       "name": req.body.name,
//       "eventDate": req.body.eventDate,
//       "eventType": req.body.eventType,
//       "eventStatus": req.body.eventStatus,
//       "eventVenue": {
//           "location":[],
//           "address": {
//             "street": req.body.street,
//               "city": req.body.city,
//               "state": req.body.state,
//               "zipcode":req.body.zipcode
//           }
//       }
//    }
//    Location.create(req.body, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
//   };

// // =============================