angular
  .module('angular-ux')
  .controller('ComboboxController', [
    '$scope',
    '$element',
    'ComboboxSingleSelect',
  (
    $scope,
    $element,
    ComboboxSingleSelect
  ) => {
    // Define some scope variables
    $scope.attributes = {};
    $scope.model = {};
    $scope.options = {};

    // Declare some additional directives
    $scope.ngModel = null;

    // Declare some additional services
    $scope.selectService = null;

    /**
     * Cancel opening the menu if clicking in the input and the combobox is editable.
     */
    $scope.cancelOpen = (event) => {
      // If the combobox is editable, stop the default event propagation
      if ($scope.options.editable) {
        event.stopPropagation();
      }
    };

    /**
     * Initializes the controller.
     */
    $scope.initialize = (attributes, ngModel) => {
      // Store the attributes to the scope
      $scope.attributes = attributes;

      // Store the ng-model controller
      $scope.ngModel = ngModel;
    };

    /**
     * Selects one of the items in the combobox's list.
     */
    $scope.select = (menu, item, apply = false) => {
      // Select the item using the select service
      $scope.selectService.select(menu, item);

      // Update the ng-model if defined
      if ($scope.ngModel) {
        $scope.ngModel.$setViewValue($scope.model.value);
      }

      // Apply the changes if needed
      apply && $scope.$apply();
    };

    /**
     * Sets the select service.
     */
    $scope.setSelectService = (selectService) => {
      // Set the new select service.
      $scope.selectService = new selectService($scope, '.ux-menuitem');
    };

    // Set the necessary services
    $scope.setSelectService(ComboboxSingleSelect);
  }])
  .directive('uxCombobox', () => {
    return {
      controller: 'ComboboxController',
      link: ($scope, $element, $attributes, ngModel) => $scope.initialize($attributes, ngModel),
      replace: true,
      require: '?ngModel',
      restrict: 'E',
      scope: {},
      templateUrl: 'form/field/combobox/Combobox',
      transclude: true
    };
  });
