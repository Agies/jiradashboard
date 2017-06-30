'use strict';
const jira = require('../../components/jira');
const fs = require('fs');
const fileName = 'lionConfig';
export function index(req, res) {
    jira
        .lionStats(`MLS - Sprint ${req.params.sprint}`, req.params.lion)
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
        });
}

export function load(req, res) {
    fs.readFile(fileName, function(err, data) {
        if(err) {
            res.status(500).json({
                error: err
            })
        }
        res.json(JSON.parse(data));
    });
}

export function update(req, res) {
    fs.writeFile(fileName, JSON.stringify(req.body), function(err) {
        if(err) {
            res.status(500).json({
                error: err
            })
        }
        console.log('Updated with: ', req.body);
    });
}

export function archive(req, res) {
    fs.writeFile(fileName, JSON.stringify(req.body), function(err) {
        if(err) {
            res.status(500).json({
                error: err
            })
        }
        console.log('Updated with: ', req.body);
    });
}