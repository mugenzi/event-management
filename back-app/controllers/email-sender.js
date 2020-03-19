const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mugenzi12345@gmail.com',
        pass: 'MJC2490950788'
    }
});

exports.sendEmail = (event, guest) => {

    const firstname = guest.firstname;
    const lastname = guest.lastname;
    const email = guest.email;
    const name = firstname + ' ' + lastname;

    const eventName = event.name;
    const eventDate = event.eventDate;
    const eventType = event.eventType;
    const venue = `${event.eventVenue.address.street}, ${event.eventVenue.address.city}, ${event.eventVenue.address.state}, ${event.eventVenue.address.zipcode}`

    const eventId = event._id;
    const guestId = guest._id;

    let emailFormat = `    
    <!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            background-color: #f0efec;
            width: 700px;
            margin: auto;
            border: solid 1px #feb424;
            border-radius: 10px;
            height: auto;
            /* font-family: 'Brush Script MT'; */
            font-family: Cambria;
            /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
        }
        
        .button {
            background-color: #051765f7;
            border: solid 2px #feb424;
            border-radius: 13px;
            box-sizing: border-box;
            display: inline-block;
            font-size: 30px;
            font-weight: bold;
            margin: 0;
            padding: 8px 15px;
            text-decoration: none;
            text-transform: capitalize;
            margin: 20px;
            margin-bottom: 60px;
            font-family: Cambria;
            width: 400px;
            color: #ffffff;
            color: #000000;
        }
        
        .button:hover {
            background-color: #feb424;
            border: solid 1px #051765f7;
            color: #000000;
        }
        
        .title {
            color: #4359b9;
            font-size: 40px;
            text-align: center;
        }
        
        .hr {
            width: 80%;
            height: 4px;
            background-color: #051765f7;
            border: solid 1px #FFC107;
        }
        
        .message {
            display: inline-block;
            font-size: 25px;
            color: #4359b9;
        }
        
        .paragraph {
            text-align: justify;
            text-justify: inter-word;
            margin: 30px;
        }
    </style>
</head>

<body>
    <div class="container">
        <p class="title">Event Management Inviation</p>
        <hr class="hr">
        <div class="message">
            <p class="paragraph">Dear ${name},<br></p>
            <p class="paragraph">Fabrice Habineza sent you an invitation to attend an event of type <strong>${eventType}</strong>, with the title <strong>${eventName}.</strong></p>
            <p class="paragraph"><strong>Venue:</strong> ${venue}.
                <br>
                <strong>Event Date:</strong> ${eventDate}.
            </p>
            <p class="paragraph"></p>
        </div>
        <div style="text-align: center;">
            <a href="http://localhost:4200/eid/${eventId}/gid/${guestId}" class="button">Confirm Availability</a>
        </div>
    </div>
</body>

</html>
    `;

    const mailOptions = {
        from: 'mugenzi12345@gmail.com',
        to: email,
        subject: 'Inviation from Event Management',
        'Content-Type': 'text/html',
        html: emailFormat.toString()
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email Sent Successfully: ' + info.response);
        }
    });
}