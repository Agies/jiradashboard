let JiraAPI = require('jira-client');
let configWork = {
  protocol: 'https',
  host: 'retail-jira',
  username: 'a686456',
  password: 'Jewel130@',
  apiVersion: '2',
  strictSSL: false
};

let jira = new JiraAPI(configWork);

var service = {
  lionStats: (sprint, lion) => {
    return jira
      .searchJira(`project = "Mobile Loyalty Suite" AND Lion = "${lion}" AND Sprint = "${sprint}" AND status != Closed AND "Story Points" is not null`, {
        maxResults: 200
      })
      .then(result => {
        var stats = {};
        result.issues.forEach(issue => {
          var cache = stats[issue.fields.status.name];
          if(!cache) {
            cache = stats[issue.fields.status.name] = {
              points: 0,
              count: 0
            };
          }
          cache.points += parseInt(issue.fields.customfield_10003, 0);
          cache.count += 1;
        });
        return stats;
      });
  }
};

module.exports = service;
