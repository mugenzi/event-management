
const Guest = require('../models/guest.model');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.guest_create = function (req, res) {
    let guest = new Guest(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            eventId: req.body.eventId,
        }
    );

    guest.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Guest Created successfully')
    })
};


exports.guest_details = function (req, res) {
    Guest.findById(req.params.id, function (err, guest) {
        if (err) return next(err);
        res.send(guest);
    })
};


exports.guest_update = function (req, res) {
    Guest.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, guest) {
        if (err) return next(err);
        res.send('Guest udpated.');
    });
};

exports.guest_delete = function (req, res) {
    Guest.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

 