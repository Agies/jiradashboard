'use strict';
const angular = require('angular');
const config = 'config';
const stats = 'stats';

/*@ngInject*/
export function socketService($rootScope, $timeout) {
  var socket = io.connect('/');
  socket.on('connect', () => {
    console.log('socket connected');
  });
  socket.on('client:connected', data => {
    console.log(`clients connected: ${data.count}`);
  });
  socket.on('client:disconnected', data => {
    console.log(`clients connected: ${data.count}`);
  });
  socket.on('disconnect', () => {
    console.log('socket disconnected');
  });
  socket.on(config, data => {
    console.log(config, data);
    $timeout(() => {
      $rootScope.$broadcast(config, data);
    }, 1);
  });
  socket.on(stats, data => {
    console.log(stats, data);
    $timeout(() => {
      $rootScope.$broadcast(stats, data);
    }, 1);
  });
  socket.on('pulse', data => {
    console.log('pulse', data);
    $timeout(() => {
      $rootScope.$broadcast('pulse', data);
    }, 1);
  });
  var service = {
    events: {
      config,
      stats,
    },
    socket
  };
  return service;
}

export default angular.module('jiradashboardApp.socket', [])
  .service('socket', socketService)
  .name;
