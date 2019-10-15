angular
  .module('ux.angular')
  .directive('uxMenuitem', () => {
    return {
      link: ($scope, $element, $attributes) => {
        if ($attributes.selected !== undefined) {
          $scope.$parent.select($element.attr('value'), $element.html());
        }
      },
      replace: true,
      restrict: 'E',
      templateUrl: 'menu/MenuItem',
      transclude: true
    };
  });
