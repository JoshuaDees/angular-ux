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
