const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middlewares/authenticateJWT');

// Require the controllers WHICH WE DID NOT CREATE YET!!
const guest_controller = require('../controllers/guest.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', authenticateJWT, guest_controller.test);

router.post('/create/:id', authenticateJWT, guest_controller.guest_create);

router.get('/', authenticateJWT, guest_controller.guest_all);

router.post('/guest/:gid/event/:eid/status/:status', guest_controller.guest_confirm);

// router.put('/:id/update', guest_controller.guest_update);

// router.delete('/:id/delete', guest_controller.guest_delete);

module.exports = router;