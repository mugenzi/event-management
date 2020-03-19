const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT');

// Require the controllers WHICH WE DID NOT CREATE YET!!
const location = require('../controllers/location');

//Route - Location
router.get('/test', authenticateJWT, location.test);
router.get('/findAll', authenticateJWT, location.findAll);
router.get('/:nearest/', authenticateJWT, location.getNearest);

module.exports = router;