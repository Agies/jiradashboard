import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, $scope, storage, Modal) {
    this.$http = $http;
    this.storage = storage;
    this.modal = Modal;
    $scope.$on('pulse', (event, data) => {
      this.lastUpdate = data.lastUpdate;
    });
  }

  data = {};

  $onInit() {
    var modal = this.modal.alert.spinner();
    this.$http
      .get('/api/lion')
      .then(result => {
        this.data = result.data || {};
        if (result.data.startDate) {
          this.data.startDate = new Date(result.data.startDate);
        }
      }, error => {
        console.error(error);
      })
      .then(() => {
        modal.close();
      });
  }

  save() {
    var modal = this.modal.alert.spinner();
    this.$http
      .post('/api/lion', this.data)
      .then(result => {
        this.data = result.data;
        if (result.data.startDate) {
          this.data.startDate = new Date(result.data.startDate);
        }
      }, error => {
        console.error(error);
      })
      .then(() => {
        modal.close();
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
