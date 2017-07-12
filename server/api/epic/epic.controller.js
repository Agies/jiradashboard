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
      var cache = {};
      var last = stats[stats.length - 1];
      var current = {
        total: aggregate(last, 'points'),
        count: aggregate(last, 'count'),
        Unpointed: last.Unpointed,
        Backlog: last.Ready,
        Done: last.Done
      };
      current['In Progress'] = accumulate(last);
      cache.current = current;
      var map = stats.map(stat => {
        var result = {
          total: aggregate(stat, 'points'),
          count: aggregate(stat, 'count'),
          date: stat.date,
          key: stat.key,
          lastUpdate: stat.lastUpdate,
          Unpointed: stat.Unpointed,
          Backlog: stat.Ready,
          Done: stat.Done
        };
        result['In Progress'] = accumulate(stat);
        return result;
      });
      cache.stats = map;
      res.json(cache);
    })
    .then(null, error => {
      console.error(error);
      res.status(500).json({ error });
    });
}

function aggregate(stat, prop) {
  var sum = 0;
  for (var key in stat) {
    var value = parseInt(stat[key][prop], 0);
    if (isNaN(value)) continue;
    sum += value;
  }
  return sum;
}

function accumulate(obj) {
  const props = ['Development In Progress', 'Ready to QA', 'QA In Progress', 'Ready to Review'];
  var result = {
    points: 0,
    count: 0
  };
  props.forEach(prop => {
    var o = obj[prop];
    if (!o) return;
    result.points += o.points;
    result.count += o.count;
  });
  return result;
}
