const { Router, json } = require('express');
const jwt = require('jsonwebtoken');

const { accessTokenSecret } = require('../config.json');

const authenticateJWT = require('../middlewares/authenticateJWT');

const Organizer = require('../models/organizer');
const Controller = require('../controllers/orgernizer')
const router = Router();

const bcrypt = require('bcryptjs');

router.get('/', authenticateJWT, Controller.findAll);

router.get('/id/:id', authenticateJWT, Controller.findById);

router.get('/logged', authenticateJWT, Controller.findLoggedUser);

router.get('/email/:email', authenticateJWT, Controller.findByEmail);

router.post('/', json(), Controller.create);

router.post('/:email', json(), Controller.update);

module.exports = router;