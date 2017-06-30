'use strict';
const angular = require('angular');

/*@ngInject*/
export function storageService() {
	this.set = function(key, object) {
    window.localStorage.setItem(key.toLowerCase(), JSON.stringify(object));
  }
  this.get = function(key) {
    return JSON.parse(window.localStorage.getItem(key.toLowerCase()));
  }
}

export default angular.module('jiradashboardApp.storage', [])
  .service('storage', storageService)
  .name;
