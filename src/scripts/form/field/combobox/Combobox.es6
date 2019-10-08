angular
  .module('angular-ux')
  .controller('uxComboboxController', ['$scope', 'ComboboxSingleSelect', ($scope, ComboboxSingleSelect) => {
    // Define some scope variables
    $scope.attributes = {};
    $scope.model = {};
    $scope.options = {};

    // Define some scope services
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
    $scope.initialize = (attributes) => {
      // Store the attributes to the scope
      $scope.attributes = attributes;
    };

    /**
     * Selects one of the items in the combobox's list.
     */
    $scope.select = (menu, item, apply = false) => {
      // Select the item using the select service
      $scope.selectService.select(menu, item);

      // Apply the changes if needed
      apply && $scope.$apply();
    };

    $scope.setSelectService = (selectService) => {
      $scope.selectService = new selectService($scope, '.ux-menuitem');
    };

    $scope.setSelectService(ComboboxSingleSelect, '.ux-menuitem');
  }])
  .directive('uxCombobox', () => {
    return {
      controller: 'uxComboboxController',
      link: ($scope, $element, $attributes) => $scope.initialize($attributes),
      replace: true,
      restrict: 'E',
      scope: true,
      templateUrl: 'form/field/combobox/Combobox',
      transclude: true
    };
  });
