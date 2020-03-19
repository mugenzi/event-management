const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT');

const event_controller = require('../controllers/event-edit.controller');

router.put('/updateEvent/:id', authenticateJWT, event_controller.event_update);

module.exports = router;