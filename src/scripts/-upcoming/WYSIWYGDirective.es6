angular.module('angular-ux')
  .directive('uxWysiwyg', () => {
    return {
      controller: 'WYSIWYGController',
      link: (scope, element) => scope.init(element),
      replace: true,
      restrict: 'A',
      scope: true,
      templateUrl: '-upcoming/WYSIWYGTemplate',
      transclude: true
    };
  });
