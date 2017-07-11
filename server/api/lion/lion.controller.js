'use strict';
const data = require('../../components/data');
const db = new data.DB('lion');
const config = new data.DB('lionConfig');
const io = require('../../components/websocket');

export function index(req, res) {
  const startDate = req.params.sprint;
  var range = [];
  range.push(addDays(startDate, 0));
  range.push(addDays(startDate, 3));
  range.push(addDays(startDate, 4));
  range.push(addDays(startDate, 5));
  range.push(addDays(startDate, 6));
  range.push(addDays(startDate, 7));
  range.push(addDays(startDate, 10));
  range.push(addDays(startDate, 11));
  range.push(addDays(startDate, 12));
  range.push(addDays(startDate, 13));
  var query = {
    key: req.params.key,
    date: {
      $in: range
    }
  };
  console.log('Querying: ', query);
  db
    .find(query)
    .then(stats => {
      res.json({
        range,
        stats
      });
    })
    .then(null, error => {
      res.status(500).json({error});
    });
}

export function save(req, res) {
  var data = req.body;
  var key = req.params.key;
  data.key = key;
  data.date = formatDate(new Date());
  db.findAndUpdate({
    date: data.date,
    key: data.key
  }, data)
    .then(r => {
      res.json(data);
      io.broadcast('stats', data);
    }, err => {
      res.status(500).json({
        error: err
      });
    });
}

export function load(req, res) {
  config
    .find()
    .then(data => {
      res.json(data[0]);
    }, err => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    });
}

export function update(req, res) {
  config
    .save(req.body)
    .then(data => {
      res.json(req.body);
      io.broadcast('config', req.body);
    }, err => {
      res.status(500).json({
        error: err
      });
    });
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return formatDate(result);
}
function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
