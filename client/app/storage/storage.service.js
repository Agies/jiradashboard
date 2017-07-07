'use strict';
const angular = require('angular');

/*@ngInject*/
export class storageService {
  set = (key, object) => {
    window.localStorage.setItem(key.toLowerCase(), JSON.stringify(object));
  };
  get = key => JSON.parse(window.localStorage.getItem(key.toLowerCase()));
}

export default angular.module('jiradashboardApp.storage', [])
  .service('storage', storageService)
  .name;
