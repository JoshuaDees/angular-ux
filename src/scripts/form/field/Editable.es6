angular
  .module('angular-ux')
  .directive('uxEditable', [() => {
    return {
      link: ($scope) => $scope.options.editable = true,
      require: 'uxCombobox',
      restrict: 'A'
    };
  }]);
