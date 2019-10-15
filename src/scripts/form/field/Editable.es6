angular
  .module('angular-ux')
  .directive('uxEditable', [() => {
    return {
      link: ($scope, $element, $attributes, $controller) => $controller.options.editable = true,
      require: 'uxCombobox',
      restrict: 'A'
    };
  }]);
