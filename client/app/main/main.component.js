import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, storage) {
    this.$http = $http;
    this.storage = storage;
  }
  
  sprint = 0;
  blueCommit = 0;
  redCommit = 0;
  greenCommit = 0;

  $onInit() {
    this.blueCommit = this.storage.get('bluecommit');
    this.greenCommit = this.storage.get('greencommit');
    this.redCommit = this.storage.get('redcommit');
    this.sprint = this.storage.get('sprint');
  }

  save() {
    this.storage.set('bluecommit', this.blueCommit);
    this.storage.set('redcommit', this.greenCommit);
    this.storage.set('greencommit', this.redCommit);
    this.storage.set('sprint', this.sprint);
  }
}

export default angular.module('jiradashboardApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
