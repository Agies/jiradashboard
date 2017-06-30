'use strict';
let jira = require('../../components/jira');

export function index(req, res) {
    jira
    .lionStats('MLS - Sprint 52', 'Blue')
    .then(result => {
        res.json(result);
    })
    .then(null, error => {
        var obj = { };
        obj['Ready'] = {
            points: 10,
            count: 5
        }
        obj['Development In Progress'] = {
            points: 10,
            count: 5
        }
        obj['Ready To QA'] = {
            points: 10,
            count: 5
        }
        obj['QA In Progress'] = {
            points: 10,
            count: 5
        }
        obj['Ready For Review'] = {
            points: 10,
            count: 5
        }
        obj['Done'] = {
            points: 10,
            count: 5
        }
        res.json(obj);
        // res.status(500).json({
        //     error: error.message
        // })
    });
}