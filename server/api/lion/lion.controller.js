'use strict';
const data = require('../../components/data');
const db = new data.DB('lion');
const config = new data.DB('lionConfig');
const storage = require('../../components/storage');
const fileName = 'lionConfig';

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
    lion: req.params.lion,
    date: {
      $in: range
    }
  };
  console.log('Querying: ', query);
  db
    .find(query)
    .then(result => {
      res.json(result);
    })
    .then(null, () => {
      var obj = {};
      obj.Ready = {
        points: 10,
        count: 5
      };
      obj['Development In Progress'] = {
        points: 10,
        count: 5
      };
      obj['Ready To QA'] = {
        points: 10,
        count: 5
      };
      obj['QA In Progress'] = {
        points: 10,
        count: 5
      };
      obj['Ready For Review'] = {
        points: 10,
        count: 5
      };
      obj.Done = {
        points: 10,
        count: 5
      };
      res.json(obj);
    });
}

export function save(req, res) {
  var data = req.body;
  const now = new Date();
  const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
  data.date = date;
  db.findAndUpdate({
    date: data.date,
    lion: data.lion
  }, data)
    .then(r => {
      res.json(data);
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
