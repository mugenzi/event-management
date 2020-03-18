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
    const organizer = await Organizer.findOne({ email: req.params.email });
    organizer ? res.send(organizer) : res.status(404).send({ message: "User not found." });
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
        const accessToken = jwt.sign(userObject, accessTokenSecret, {
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