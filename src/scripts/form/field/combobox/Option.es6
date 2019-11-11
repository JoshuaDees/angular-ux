angular
  .module('ux.angular')

  /**
   * @ngdoc directive
   * @name ux.angular.directive:uxOption
   *
   * @description
   *  // TODO:
   */
  .directive('uxOption', () => {
    return {
      link: ($scope, $element, $attributes) => {
        // Define some scope properties
        $scope.$element = $element;

        // Auto-select the option if defined
        if ($attributes.selected !== undefined) {
          $scope.$parent.$parent.select(undefined, $element);
        }
      },
      replace: true,
      restrict: 'E',
      scope: true,
      templateUrl: 'form/field/combobox/Option',
      transclude: true
    };
  });
