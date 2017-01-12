const express = require('express');
const jsonfile = require('jsonfile');
const path = require('path');
const router = express.Router();

// declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
router.get('/events', (req, res) => {
  // Get posts from the mock api

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

module.exports = router;