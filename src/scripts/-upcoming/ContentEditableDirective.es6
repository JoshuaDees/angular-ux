angular.module('ux.angular')
  .directive('contenteditable', ['$sce', $sce => {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: (scope, element, attrs, ngModel) => {
        // If the ng-model attribute is not present, do nothing
        if (!ngModel) {
          return;
        }

        // Update the model value
        const update = () => {
          // Grab the current html
          let html = element.html();

          // When we clear the content editable the browser leaves a <br> behind, strip this out
          if (html == '<br>') {
            html = '';
          }

          // Update the model value
          ngModel.$setViewValue(html);
        };

        // Specify how UI should be updated when the model changes internally
        ngModel.$render = () => {
          element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
        };

        // Listen for change events to enable updating
        element.on('blur keyup change', () => {
          scope.$evalAsync(update);
        });

        // Update the initial model value
        update();
      }
    };
  }]);
