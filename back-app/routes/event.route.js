const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT');

const event_controller = require('../controllers/event.controller');

router.post('/create', authenticateJWT, event_controller.event_create);

router.get('/', authenticateJWT, event_controller.event_all);

router.put('/update/:id', authenticateJWT, event_controller.event_update);



// router.post('/create/:id', event_controller.event_create);

// router.get('/:id', event_controller.event_find);

// router.get('/:id', event_controller.guest_details);

// router.put('/:id/update', guest_controller.guest_update);

// router.delete('/:id/delete', guest_controller.guest_delete);

module.exports = router;