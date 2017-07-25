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
  }, {
    title: 'Frictionless',
    state: 'epic({name: "Frictionless"})'
  }, {
    title: 'Payments',
    state: 'epic({name: "eNAC1"})'
  }, {
    title: 'Transactions',
    state: 'epic({name: "eNAC2"})'
  }, {
    title: 'Profile',
    state: 'epic({name: "eNAC3"})'
  }];
  isCollapsed = true;
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
