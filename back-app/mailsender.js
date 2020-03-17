var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    debug: true,
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