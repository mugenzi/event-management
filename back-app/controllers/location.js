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

// exports.AddLocation = function (req, res) {
//     Location.create(req.body, (error, data) => {
//         if (error) {
//           return next(error)
//         } else {
//           res.json(data)
//         }
//       })
// };

