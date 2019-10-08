angular.module('angular-ux')
  .directive('uxColorPicker', () => {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '-upcoming/ColorPickerTemplate'
    };
  });
