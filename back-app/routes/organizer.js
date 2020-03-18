const { Router, json } = require('express');
const jwt = require('jsonwebtoken');

const { accessTokenSecret } = require('../config.json');

const authenticateJWT = require('../middlewares/authenticateJWT');

const Organizer = require('../models/organizer');
const Controller = require('../controllers/orgernizer')
const router = Router();

const bcrypt = require('bcryptjs');

router.get('/', authenticateJWT, Controller.findAll);

router.get('/id/:id', authenticateJWT, Controller.findById);

router.get('/logged', authenticateJWT, Controller.findLoggedUser);

router.get('/email/:email', authenticateJWT, Controller.findByEmail);

router.post('/', json(), Controller.create);

router.post('/:email', json(), Controller.update);

//router.post('/login', json(), Controller.login);


// var MailConfig = require('../config/email');
// var hbs = require('nodemailer-express-handlebars');
// var gmailTransport = MailConfig.GmailTransport;
var nodemailer = require('nodemailer');
router.get('/sendemail', (req, res, next) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mugenzi12345@gmail.com',
            pass: 'MJC2490950788'
        }
    });

    var mailOptions = {
        from: 'mugenzi12345@gmail.com',
        to: 'mugenziclaude@gmail.com',
        subject: 'Invitation from Event Management',
        text: 'Please Confirm your availability'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

module.exports = router;