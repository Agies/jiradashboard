import angular from 'angular';

export class CardComponent {
  /*@ngInject*/
  constructor(Util) {
    this.util = Util;
  }
  color = '#000000';
  $onInit() {
    this.backgroundColor = this.util.shadeColor(this.color, .80);
    this.borderColor = this.util.shadeColor(this.color, .30);
  }
}

export default angular.module('directives.card', [])
  .component('card', {
    template: require('./card.html'),
    controller: CardComponent,
    bindings: {
      stats: '<',
      color: '<'
    }
  })
  .name;
