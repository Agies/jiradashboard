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
        this.commit = result.data[this.name.toLowerCase() + 'Commit']
        var sprint = result.data.sprint;
        this.labels = [];
        this.createDateRun(new Date(result.data.startDate), this.labels);
        this.$http
          .get(`/api/lion/${result.data.startDate}/${this.name}`)
          .then(r => {
            this.stats = r.data[r.data.length - 1];
            this.data = [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, null, null, null, null, null, null, null, null, this.commit]
            ];
            r.data.forEach(p => {
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

  createDateRun(startDate, labels) {
    labels.push(addDays(startDate, 0));
    labels.push(addDays(startDate, 3));
    labels.push(addDays(startDate, 4));
    labels.push(addDays(startDate, 5));
    labels.push(addDays(startDate, 6));
    labels.push(addDays(startDate, 7));
    labels.push(addDays(startDate, 10));
    labels.push(addDays(startDate, 11));
    labels.push(addDays(startDate, 12));
    labels.push(addDays(startDate, 13));
  }

  $onInit() {
    this.name = this.$stateParams.name;
    this.color = colorMap[this.name];
    this.barColor = this.util.shadeColor(this.color, .50);
    this.load();
    this.token = this.$interval(() => {
      this.load();
    }, 60 * 1000);
  }

  $onDestroy() {
    this.$interval.cancel(this.token);
  }

  labels = ['Friday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
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
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return formatDate(result);
}
function formatDate(date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
export default angular.module('jiradashboardApp.lion', [uiRouter])
  .config(routing)
  .component('lion', {
    template: require('./lion.html'),
    controller: LionController
  })
  .name;
