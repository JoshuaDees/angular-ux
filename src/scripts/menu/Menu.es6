angular
  .module('ux.angular')
  .directive('uxMenu', () => {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'menu/Menu',
      transclude: true
    };
  });
