import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './lion.routes';

let colorMap = {
  Red: '#ff0000',
  Blue: '#0000ff',
  Green: '#00ff00'
};

export class LionController {
  name = 'test';
  stats = null;

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
      .get('/api/lion')
      .then(result => {
        this.commit = result.data[this.name.toLowerCase() + 'Commit']
        var sprint = result.data.sprint;
        this.$http
          .get(`/api/lion/${result.data.startDate}/${this.name}`)
          .then(r => {
            this.stats = r.data.stats[r.data.stats.length - 1];
            this.labels = r.data.range;
            this.data = [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, null, null, null, null, null, null, null, null, this.commit]
            ];
            r.data.stats.forEach(p => {
              var index = -1;
              if ((index = this.labels.indexOf(p.date)) >= 0) {
                this.data[0][index] = p.Done.points;
              }
            });
            if (!this.stats) {
              this.percent = this.complete = 0;
              return;
            }
            this.percent = parseInt(parseFloat(this.stats.Done.points) / parseFloat(this.commit) * 100, 0);
            if (this.percent > 100) {
              this.complete = 100;
            } else {
              this.complete = this.percent;
            }
          });
      });
  }

  $onInit() {
    this.name = this.$stateParams.name;
    this.color = colorMap[this.name];
    this.barColor = this.util.shadeColor(this.color, .50);
    this.load();
  }

  $onDestroy() {
  }

  labels = [];
  series = ['Curent', 'Ideal'];
  options = {
    spanGaps: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };
}

export default angular.module('jiradashboardApp.lion', [uiRouter])
  .config(routing)
  .component('lion', {
    template: require('./lion.html'),
    controller: LionController
  })
  .name;
