const jwt = require('jsonwebtoken');

const { accessTokenSecret } = require('../config.json');

module.exports = (req, res, next) => {
    // const authHeader = req.headers.authorization;
    const token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    if (token) {
        // const token = authHeader.split(' ')[1];
        //console.log('split: ' + token);
        // const token1 = req.headers['x-access-token'];
        //console.log('x-access-token: ' + token);
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};