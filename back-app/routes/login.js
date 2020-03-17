const { Router, json } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { accessTokenSecret } = require('../config.json');

const User = require('../models/organizer');
const router = Router();

// router.post("/", json(), async(req, res) => {
//     console.log('########NAHAGEZE');
//     console.log(req.body.email);
//     const user = await User.findOne({ "email": req.body.email });
//     if (user) {
//         const { password, ...userObject } = user.toObject();
//         const accessToken = jwt.sign(userObject, accessTokenSecret, {
//             expiresIn: 86400 // expires in 24 hours
//         });
//         res.send({ accessToken });
//     } else {
//         res.status(401).send({ message: "Invalid credentials." })
//     }
// });

//MY LOGIN
router.post('/login', json(), async function(req, res) {
    console.log('#######you are calling login service');
    await User.findOne({ email: req.body.email }, function(err, user) {
        if (err) return res.status(500).send('Server side error.');
        if (!user) return res.status(404).send('Organizer not found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, accessTokenSecret, {
            expiresIn: 86400 // expires in 24 hours
        });
        console.log('Login successfully')
        res.status(200).send({ auth: true, token: token });
    });
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;