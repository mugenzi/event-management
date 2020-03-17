const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const guest_controller = require('../controllers/guest.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', guest_controller.test);

router.post('/create/:id', guest_controller.guest_create);

router.get('/', guest_controller.guest_all);

// router.get('/:id', guest_controller.guest_details);

// router.put('/:id/update', guest_controller.guest_update);

// router.delete('/:id/delete', guest_controller.guest_delete);

module.exports = router;