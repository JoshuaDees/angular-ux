angular
  .module('ux.angular')
  .directive('uxOption', () => {
    return {
      link: ($scope, $element, $attributes) => {
        if ($attributes.selected !== undefined) {
          $scope.$parent.select(null, $element);
        }
      },
      replace: true,
      restrict: 'E',
      templateUrl: 'form/field/combobox/Option',
      transclude: true
    };
  });
