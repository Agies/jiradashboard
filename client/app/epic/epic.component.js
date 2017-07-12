import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './epic.routes';

export class EpicController {
  name = 'test';
  stats = null;
  labels = [];
  series = ['Growth', 'Burn Down'];
  options = {
    legend: {
      display: true
    }
  };
  datasetOverride = [{
    type: 'bar'
  }, {
    type: 'line'
  }];

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

  get complete() {
    if (this.percent > 100) {
      return 100;
    }
    return this.percent || 0;
  }

  load() {
    this.$http
      .get(`/api/epic/${this.name}`)
      .then(data => {
        var r = data.data;
        this.total = r.current.total;
        this.count = r.current.count;
        this.done = (r.current.Done || {}).points || 0;
        this.finished = (r.current.Done || {}).count || 0;
        this.stats = r.current;
        this.labels = r.stats.map(s => s.date);
        this.data = [];
        this.data.push(r.stats.map(s => s.total));
        this.data.push(r.stats.map(s => this.total - ((s.Done || {}).points || 0)));
        this.percent = Math.ceil(this.done / this.total * 100);
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
