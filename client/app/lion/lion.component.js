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

  /*@ngInject*/
  constructor($http, $stateParams, storage, Util) {
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.storage = storage;
    this.util = Util;
  }

  $onInit() {
    this.name = this.$stateParams.name;
    this.commit = this.storage.get(this.name+'commit') || 0;
    this.color = colorMap[this.name];
    this.barColor = this.util.shadeColor(this.color, .50);
    this.$http
        .get(`/api/lion/${this.name}`)
        .then(result => {
            this.stats = result.data;
            this.complete = parseInt(parseFloat(this.stats.Done.points)/parseFloat(this.commit) * 100);
        });
  }
}

export default angular.module('jiradashboardApp.lion', [uiRouter])
  .config(routing)
  .component('lion', {
    template: require('./lion.html'),
    controller: LionController
  })
  .name;
