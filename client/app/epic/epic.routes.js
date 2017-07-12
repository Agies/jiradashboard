'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('epic', {
    url: '/epic/:name',
    template: '<epic></epic>'
  });
}
