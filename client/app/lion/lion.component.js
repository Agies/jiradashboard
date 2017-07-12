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
        this.$http
          .get(`/api/lion/${result.data.startDate}/${this.name}`)
          .then(r => {
            this.stats = r.data.stats[r.data.stats.length - 1];
            this.labels = r.data.range;
            const days = this.labels.length;
            this.data = [
              [10],
              []
            ];
            const pro = this.commit / (days - 1);
            for (var i = 0; i < days; i++) {
              this.data[1].push(pro * i);
            }
            r.data.stats.forEach(p => {
              var index = -1;
              if ((index = this.labels.indexOf(p.date)) >= 0) {
                if (p.Done) {
                  this.data[0][index] = p.Done.points;
                }
              }
            });
            if (!this.stats || !this.stats.Done) {
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
    if (!this.color) {
      this.color = '#000000';
    }
    this.barColor = this.util.shadeColor(this.color, .50);
    this.load();
  }

  $onDestroy() {}

  labels = [];
  series = ['Current', 'Ideal'];
  options = {
    spanGaps: false,
    legend: {
      display: true
    },
    scales: {
      yAxes: [{
        id: 'y-axis-1',
        type: 'linear',
        display: true,
        position: 'left'
      }]
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
