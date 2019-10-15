angular
  .module('ux.angular')

  /**
   * @ngdoc controller
   * @name ux.angular.controller:Combobox
   *
   * @description
   *  Defines the controller that runs the {@link angular-ux.directive:uxCombobox Combobox} directive.
   */
.controller('Combobox', [
    '$scope',
    '$element',
    'ComboboxSingleSelect',
  (
    $scope,
    $element,
    ComboboxSingleSelect
  ) => {
    /**
     * Cancel opening the menu if clicking in the input and the combobox is editable.
     */
    $scope.cancelOpen = (event) => {
      // If the combobox is editable, stop the default event propagation
      if ($scope.editableService) {
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
        $scope.ngModel.$setViewValue($scope.selectService.model.value);
      }

      // Apply the changes if needed
      apply && $scope.$apply();
    };

    /**
     * Sets the editable service.
     */
    $scope.setEditableService = (editableService) => $scope.editableService = editableService;

    /**
     * Sets the select service.
     */
    $scope.setSelectService = (selectService) => {
      // Set the select service's item selector
      selectService.itemSelector = '.ux-menuitem';

      // Set the select service
      $scope.selectService = selectService;
    };

    // Set the necessary services
    $scope.setSelectService(new ComboboxSingleSelect());

    // Return the scope
    return $scope;
  }])

  /**
   * @ngdoc directive
   * @name ux.angular.directive:uxCombobox
   *
   * @description
   *  Defines the Combobox directive.

   * @example
   *
   *  <ux-combobox [name] [ng-model="{model}"] [placeholder="{placeholder}"] [required] [ux-combobox-editable] [ux-combobox-multiselect]>
   *    <!-- Options -->
   *  </ux-combobox>
   */
.directive('uxCombobox', () => {
    return {
      controller: 'Combobox',
      link: ($scope, $element, $attributes, ngModel) => $scope.initialize($attributes, ngModel),
      replace: true,
      require: '?ngModel',
      restrict: 'E',
      scope: {},
      templateUrl: 'form/field/combobox/Combobox',
      transclude: true
    };
  });
