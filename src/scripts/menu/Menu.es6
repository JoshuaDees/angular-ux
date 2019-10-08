angular
  .module('angular-ux')
  .directive('uxMenu', () => {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'menu/Menu',
      transclude: true
    };
  });
