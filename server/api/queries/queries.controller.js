'use strict';
const data = require('../../components/data');
const db = new data.DB('queries');

export function load(req, res) {
  db
    .find({
      disabled: { $ne: true }
    })
    .then(data => {
      res.json(data);
    }, err => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    });
}