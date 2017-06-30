import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './lion.routes';

let colorMap = {
  Red: '#ff0000',
  Blue: '#0000ff',
  Green: '#00ff00'
}

export class LionController {
  name = 'test';
  stats = null;
  token = null;

  /*@ngInject*/
  constructor($http, $stateParams, $interval, Util) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.util = Util;
    this.$interval = $interval;
  }

  load() {
    this.$http
      .get('/api/lion') 
      .then(result => {
        this.commit = result.data[this.name.toLowerCase() + 'commit']
        var sprint = result.data.sprint;
        this.$http
          .get(`/api/lion/${sprint}/${this.name}`)
          .then(result => {
            this.stats = result.data;
            this.percent = parseInt(parseFloat(this.stats.Done.points) / parseFloat(this.commit) * 100);
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
    this.token = this.$interval(() => {
      this.load();
    }, 60000);
  }

  $onDestroy() {
    this.$interval.cancel(this.token);
  }

  labels = ["Friday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  series = ['Series A', 'Series B'];
  data = [
    [10, 12, 14, 15, 15, 18, 20, 22, 25, 30],
    [0, null, null, null, null, null, null, null, null, 34]
  ];
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
