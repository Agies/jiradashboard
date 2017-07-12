import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './epic.routes';

export class EpicController {
  name = 'test';
  stats = null;
  labels = [];
  series = ['Current', 'Ideal'];
  options = {
    spanGaps: false,
    scales: {
      yAxes: [{
        id: 'y-axis-1',
        type: 'linear',
        display: true,
        position: 'left'
      }]
    }
  };

  /*@ngInject*/
  constructor($http, $stateParams, $scope, Util, socket) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.util = Util;
    this.socket = socket;
    $scope.$on('config', (event, data) => {
      this.load();
    });
    $scope.$on('stats', (event, data) => {
      this.load();
    });
  }

  load() {
    this.$http
      .get(`/api/epic/${this.name}`)
      .then(r => {
        //TODO: this.total
        //TODO: this.stats
        //TODO: this.labels
        //TODO: this.data[[],[]]
        //TODO: this.percent
        //TODO: this.complete
      });
  }

  $onInit() {
    this.name = this.$stateParams.name;
    if (!this.color) {
      this.color = '#000000';
    }
    this.barColor = this.util.shadeColor(this.color, .50);
    this.load();
  }
}

export default angular.module('jiradashboardApp.epic', [uiRouter])
  .config(routing)
  .component('epic', {
    template: require('./epic.html'),
    controller: EpicController
  })
  .name;
