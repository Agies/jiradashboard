'use strict';
const data = require('../../components/data');
const db = new data.DB('lion');

export function index(req, res) {
  var query = {
    key: req.params.key,
  };
  console.log('Querying: ', query);
  db
    .find(query, { lastUpdate: 1 })
    .then(stats => {
      res.json({
        stats
      });
    })
    .then(null, error => {
      res.status(500).json({error});
    });
}
