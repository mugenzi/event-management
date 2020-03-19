const Guest = require('../models/guest.model');
const Event = require('../models/event.model');
const EmailSender = require('../controllers/email-sender');
const CircularJSON = require('circular-json');
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


        //let aaaaa = Event.findOne({ _id: id }).populate('child.name').exec();

        //console.log('############\n' + aaaaa.toObject());


        // let AuthUser = function(data) {
        //     return google.login(data.username, data.password).then(token => { return token })
        // }

        // let userToken = AuthUser('data')
        // console.log(userToken) // Promise { <pending> }

        // userToken.then(function(result) {
        //     console.log(result) // "Some User token"
        // })

        //console.log(event);
        // console.log(event.schema.obj.name);

        //EmailSender.sendEmail(event, guest);
        res.send('Guest Created successfully');
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
        res.send('Guest udpated.');
    });
};

exports.guest_delete = function(req, res) {
    Guest.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
