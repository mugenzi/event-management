const Guest = require('../models/guest.model');
const Event = require('../models/event.model');
const EmailSender = require('../controllers/email-sender');
var mongoose = require('mongoose');

exports.test = function(req, res) {
    res.send('Greetings from the Test controller!');
};

exports.guest_create = function(req, res) {
    let eventID = req.params.id;
    var id = new mongoose.Types.ObjectId(eventID);
    let event = Event.findOne({ _id: id }, (error, data) => {
        if (error) {
            console.log(error)
            return next(error)
        }
    })

    let guest = new Guest({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
    });

    Event.updateOne(event, { $push: { guests: guest } }, function(err) {
        if (err) {
            return next(err);
        }

        let modelAttributes = null;
        let AuthUser = Event.findOne({ _id: id }).populate('child.name').exec().then((result) => {
            modelAttributes = result.toObject();
            console.log(modelAttributes);
            EmailSender.sendEmail(modelAttributes, guest);
        });


        res.send({ 'Message': 'Guest Created successfully' });
    })
};

exports.guest_all = function(req, res) {
    Guest.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
};

exports.guest_details = function(req, res) {
    Guest.findById(req.params.id, function(err, guest) {
        if (err) return next(err);
        res.send(guest);
    })
};


exports.guest_update = function(req, res) {
    Guest.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, guest) {
        if (err) return next(err);
        res.send({ 'Message': 'Guest udpated.' });
    });
};

exports.guest_delete = function(req, res) {
    Guest.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send({ 'Message': 'Deleted successfully!' });
    })
};

exports.guest_confirm = function(req, res) {
    let eventID = req.params.eid;
    var eid = new mongoose.Types.ObjectId(eventID);
    console.log('##########: \n' + eid);

    let event = Event.findOne({ _id: eid }, (error, data) => {
        if (error) {
            console.log(error)
            return next(error)
        }
    })

    let guestID = req.params.gid;
    var gid = new mongoose.Types.ObjectId(guestID);
    console.log('##########: \n' + gid);

    let guest = Event.findOne({ _id: eid, "guests._id": gid }, { "guests.$": 1 }, (error, data) => {
        if (error) {
            console.log(error)
            return next(error)
        }
    })

    console.log(guest);
    let status = req.params.status;
    Event.updateOne({ "_id": eid, "guests._id": gid }, { "$set": { "guests.$.status": status } }, function(err, guest) {

        if (err) return next(err);
        console.log(`##########: \n GUEST UPDATED WITH STATUS: ${status}`);
        res.send({ "Message": "Guest Status udpated." });
    });
};