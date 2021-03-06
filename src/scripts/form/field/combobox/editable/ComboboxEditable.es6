angular
  .module('ux.angular')

  /**
   * @ngdoc service
   * @name ux.angular.service:ComboboxEditable
   *
   * @description
   *  // TODO:
   */
  .service('ComboboxEditable', () => {
    return function() {};
  })

  /**
   * @ngdoc directive
   * @name ux.angular.directive:uxComboboxEditable
   *
   * @description
   *  // TODO:
   */
  .directive('uxComboboxEditable', ['ComboboxEditable', (ComboboxEditable) => {
    return {
      link: ($scope, $element, $attributes, $controller) => $controller.setEditableService(new ComboboxEditable()),
      priority: 1,
      require: 'uxCombobox',
      restrict: 'A'
    };
  }]);
