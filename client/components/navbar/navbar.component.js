'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Home',
    state: 'main'
  }, {
    title: 'Blue',
    state: 'lion({name: "Blue"})'
  }, {
    title: 'Green',
    state: 'lion({name: "Green"})'
  }, {
    title: 'Red',
    state: 'lion({name: "Red"})'
  }];
  isCollapsed = true;
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
