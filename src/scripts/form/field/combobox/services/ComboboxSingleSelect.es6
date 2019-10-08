angular
  .module('angular-ux')
  .service('ComboboxSingleSelect', () => {
    return function($scope) {
      $scope.model = {
        value: undefined,
        text: undefined
      };

      this.select = (menu, item) => {
        // Update the model
        $scope.model.value = item.attr('value');
        $scope.model.text = item.html();

        if (menu) {
          menu.find('[selected]').removeAttr('selected');
          item.attr('selected', true);
        }
      };
    };
  });
