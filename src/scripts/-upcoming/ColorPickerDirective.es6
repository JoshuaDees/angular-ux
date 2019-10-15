angular.module('ux.angular')
  .directive('uxColorPicker', () => {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '-upcoming/ColorPickerTemplate'
    };
  });
