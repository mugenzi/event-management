const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const location = require('../controllers/location');


//Route - Location
router.get('/test', location.test);
router.get('/findAll', location.findAll);
router.get('/:nearest/', location.getNearest);

module.exports = router;