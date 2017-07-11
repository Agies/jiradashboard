'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('lion', {
    url: '/lion/:name',
    template: '<lion></lion>'
  });
}
