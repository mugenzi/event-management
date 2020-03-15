const express = require('express');
const db = require('../db');

const collection = "event_mis";

//connect to DB every time there is a route
db.connect((err) => {
    if (err) {
        console.log('unable to connect to database');
        process.exit(1);
    }
});

module.exports.findAll = function (req, res) {
    db.getDB().collection(collection).find({})
        .toArray((err, documents) => {
            if (err) {
                console.log('error to find');
            }
            else {

                res.json(documents);
            }
        });
}



module.exports.add = function (req, res) {

    const eventName = req.body.eventName;
    const eventType = req.body.eventType;
    const eventDate = req.body.eventDate;
    const eventStatus = req.body.eventStatus;
    const guestName = req.body.guest.guestName;
    const telephone = req.body.guest.telephone;
    const guestEmail = req.body.guest.guestEmail;
    const organizer = req.body.organizer.organizer;
    const username = req.body.organizer.username;
    const password = req.body.organizer.password;
    const email = req.body.organizer.email;
    const city = req.body.address.city;
    const state = req.body.address.state;
    const ZIP = req.body.address.ZIP;
    const street = req.body.address.street;
    const serviceName = req.body.service.serviceName;
    const serviceType = req.body.service.serviceType;
    const serviceStatus = req.body.service.serviceStatus;

    db.getDB().collection(collection).insertOne({
        "eventName": eventName,
        "eventType": eventType, 
        "eventDate": eventDate,
        "eventStatus": eventStatus,
        "guest": {"guestName":guestName, "telephone":telephone, "guestEmail":guestEmail},
        "organizer": {"organizer":organizer, "username":username, "password":password, "email":email},
        "address": {"city":city, "state":state, "ZIP":ZIP, "street":street},
        "service":{"serviceName":serviceName, "serviceType":serviceType, "serviceStatus":serviceStatus}

    });

    db.getDB().collection(collection).find({})
        .toArray((err, documents) => {
            if (err) {
                console.log('error to find');
            }
            else {

                res.json(documents);
            }
        });
}
