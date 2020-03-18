const express = require('express');
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
dbConfig = require('./database/db');
    

   // Connecting with mongo db
   mongoose.Promise = global.Promise;
   mongoose.connect(dbConfig.db, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
   }).then(() => {
           console.log('Database sucessfully connected')
       },
       error => {
           console.log('Database could not connected: ' + error)
       }
   )

// Setting up port with express js
const eventRoute = require('./routes/event.route') 
const guestRoute = require('./routes/guest.route'); // Imports routes for the guests
   const organizerRouter = require('./routes/organizer');
   const loginRouter = require('./routes/login');
   const { handleErrors, handleRequestErrors, logErrors } = require('./middlewares/errorHandlers');

   const app = express();
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({
       extended: false
   }));
   app.use(cors());
   app.use(express.static(path.join(__dirname, 'dist/back-app')));
   app.use('/', express.static(path.join(__dirname, 'dist/back-app')));
  app.use('/events', eventRoute);
app.use('/guests', guestRoute);

   app.use(`/event/organizers`, organizerRouter);
   app.use(`/event/authentication`, loginRouter);

   // Create port
   const port = process.env.PORT || 4000;
   const server = app.listen(port, () => {
       console.log('Connected to port ' + port)
   })

   // Find 404 and hand over to error handler
   app.use((req, res, next) => {
       next(createError(404));
   });

   // error handler
   app.use(function(err, req, res, next) {
       console.error(err.message); // Log error message in our server's console
       if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
       res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
   });

   app.use(logErrors);
   app.use(handleRequestErrors);
   app.use(handleErrors);
