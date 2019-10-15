angular
  .module('ux.angular')
  .service('ComboboxEditable', () => {
    return function($scope) {};
  })
  .directive('uxComboboxEditable', ['ComboboxEditable', (ComboboxEditable) => {
    return {
      link: ($scope, $element, $attributes, $controller) => $controller.setEditableService(ComboboxEditable),
      priority: 1,
      require: 'uxCombobox',
      restrict: 'A'
    };
  }]);
