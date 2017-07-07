const fs = require('fs');

var service = { };

service.write = (fileName, obj) => {
  var promise = new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(obj), err => {
      if(err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
  return promise;
};

service.read = fileName => {
  var promise = new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if(err) {
        console.error(err);
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
  return promise;
};

module.exports = service;
