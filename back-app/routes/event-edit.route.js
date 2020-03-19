const express = require('express');
const router = express.Router();

 
const event_controller = require('../controllers/event-edit.controller');

 

router.put('/updateEvent/:id', event_controller.event_update);
 
module.exports = router;