'use strict';

const express = require('express');
const jsonfile = require('jsonfile');
const path = require('path');
const _ = require('lodash');
const router = express.Router();

let data;

let file = path.join(__dirname, '../data', 'events.json');

jsonfile.readFile(file, function(err, events) {
  if (err) {
    console.log(err);
  } else {
    data = events.events;
  }
});

// declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/events', (req, res) => {
  res.status(200).json({
    today: new Date().toISOString(),
    events: data
  });

  /*
  var file = path.join(__dirname, '../data', 'events.json');
  console.log('path: ' + file);

  jsonfile.readFile(file, function(err, events) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({
        today: new Date().toISOString(),
        events: events.events
      });
    }
  });
  */

  /*
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
  */
});

router.get('/events/:eventId', (req, res) => {

  let event = _.find(data, {'id': req.params.eventId});

  if (event) {
    res.status(200).json(event);
  } else {
    res.status(404).send();
  }

});

module.exports = router;