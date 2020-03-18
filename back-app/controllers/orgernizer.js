const { Router, json } = require('express');
const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../config.json');
const authenticateJWT = require('../middlewares/authenticateJWT');
const Organizer = require('../models/organizer');
const bcrypt = require('bcryptjs');

exports.findAll = async(req, res) => {
    res.send(await Organizer.find())
}

exports.findByEmail = async(req, res, next) => {
    console.log('#########SNdakubona')
    const organizer = await Organizer.findOne({ email: req.params.email });
    organizer ? res.send(organizer) : res.status(404).send({ message: "User not found." });
}

exports.findLoggedUser1 = async(req, res, next) => {
    const token = req.headers['x-access-token'];
    await Organizer.findById(token, { password: 0 }, // projection
        function(err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            res.status(200).send(user);
        });
}

exports.findLoggedUser = async(req, res) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, accessTokenSecret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        Organizer.findById(decoded.id, function(err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            console.log(`${user.firstname} ${user.lastname}`);
            res.status(200).send(user);
        });
    });
}

exports.findById = async(req, res, next) => {
    var mongoose = require('mongoose');
    console.log("#####Urahari");
    var id = new mongoose.Types.ObjectId("5e6eed7f750dd53e3057793f");
    const organizer = await Organizer.findOne({ _id: id });
    organizer ? res.send(organizer) : res.status(404).send({ message: "User not found." });
}

exports.update = async(req, res, next) => {
    const user = await Organizer.findOneAndUpdate({ "email": req.params.email }, { $set: req.body }, { useFindAndModify: false }, function(err, guest) {
        if (err) return next(err);
        const accessToken = jwt.sign(req.body, accessTokenSecret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(201).send({ message: "Organizer Updated successfully.", accessToken });
    });
}

exports.create = async(req, res, next) => {
    console.log("Registering#####: " + req.body)
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const newObject = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    }

    new Organizer(newObject).save((err) => {
        if (err) return next(err);
        const { password, ...userObject } = req.body;
        const accessToken = jwt.sign(userObject, accessTokenSecret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(201).send({ message: "Organizer created successfully.", accessToken });
    });
}