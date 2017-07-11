'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngCharts from 'angular-chart.js';

import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import card from '../components/card/card.component';
import storage from './storage/storage.service';
import main from './main/main.component';
import lion from './lion/lion.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket.service';

import './app.css';

angular.module('jiradashboardApp', [ngCookies, ngResource, ngSanitize, uiRouter, ngCharts, uiBootstrap,
  navbar, footer, card, main, lion, constants, util, storage, socket
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['jiradashboardApp'], {
      strictDi: true
    });
  });
