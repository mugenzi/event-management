const express = require('express');
const router = express.Router();

 
const event_controller = require('../controllers/edit-event.controller');

router.post('/create', event_controller.event_create);

router.get('/', event_controller.event_all);

router.put('/update/:id', event_controller.event_update);
 

module.exports = router;