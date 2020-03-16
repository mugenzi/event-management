const express = require('express');
const eventRoute = express.Router();

// Event model
let Event = require('../models/event');

// Add Event
eventRoute.route('/create').post((req, res, next) => {
    Event.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Event
eventRoute.route('/').get((req, res) => {
  Event.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single event
eventRoute.route('/get/:id').get((req, res) => {
  Event.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update event
eventRoute.route('/update/:id').put((req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// // Delete event
// eventRoute.route('/delete/:id').delete((req, res, next) => {
//   Event.findOneAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data
//       })
//     }
//   })
// })

module.exports = eventRoute;
 