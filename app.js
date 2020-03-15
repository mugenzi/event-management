const express = require('express');
const controller = require('./controller/routes');
const bodyParser = require('body-parser');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Route
app.get('/', controller.findAll);  
app.post('/', controller.add); 

//Bootup
app.listen(4000, ()=>console.log('Listening on port 4000.......'))