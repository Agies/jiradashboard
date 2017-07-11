import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, storage) {
    this.$http = $http;
    this.storage = storage;
  }

  data = {};

  $onInit() {
    this.$http
      .get('/api/lion')
      .then(result => {
        this.data = result.data || {};
        if (result.data.startDate) {
          this.data.startDate = new Date(result.data.startDate);
        }
      });
  }

  save() {
    console.log(this.data);
    this.$http
      .post('/api/lion', this.data)
      .then(result => {
        console.log('Stats Saved!', result);
        this.data = result.data;
        if (result.data.startDate) {
          this.data.startDate = new Date(result.data.startDate);
        }
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
