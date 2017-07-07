'use strict';
const jira = require('../../components/jira');
const storage = require('../../components/storage');
const fileName = 'lionConfig';
export function index(req, res) {
  jira
    .lionStats(`MLS - Sprint ${req.params.sprint}`, req.params.lion)
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

export function load(req, res) {
  storage
    .read(fileName)
    .then(data => {
      res.json(data);
    }, err => {
      console.error(err);
      res.status(500).json({
        error: err
      });
    });
}

export function update(req, res) {
  storage
    .write(fileName)
    .then(() => {
      res.json();
    }, err => {
      res.status(500).json({
        error: err
      });
    });
}

export function archive(req, res) {
}
