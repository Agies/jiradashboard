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
    this.$http
      .get('/api/lion')
      .then(result => {
        this.blueCommit = result.data.bluecommit || 0;
        this.greenCommit = result.data.greencommit || 0;
        this.redCommit = result.data.redcommit || 0;
        this.sprint = result.data.sprint || 0;
      });
  }

  save() {
    this.$http
      .post('/api/lion', {
        bluecommit: this.blueCommit,
        redcommit: this.redCommit,
        greencommit: this.greenCommit,
        sprint: this.sprint
      })
      .then(result => {
        console.log('Stats Saved!', result);
      });
  }
}

export default angular.module('jiradashboardApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
