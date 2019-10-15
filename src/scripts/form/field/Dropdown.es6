angular
  .module('ux.angular')
  .controller('DropdownController', ['$scope', ($scope) => {
    // Element variables
    let $body = angular.element(document.body);
    let $target;
    let $menu;

    let uxDropdown;

    // Helper methods
    const offsetLeft = (element) => element.offsetLeft + (element.offsetParent ? offsetLeft(element.offsetParent) : 0);
    const offsetTop = (element) => element.offsetTop + (element.offsetParent ? offsetTop(element.offsetParent) : 0);

    const init = () => {
      // If the menu has already been initialized or does not exist
      if ($menu || !$target[0].getElementsByClassName('ux-menu')[0]) {
        // Do nothing
        return;
      }

      // Store the menu
      $menu = angular.element($target[0].getElementsByClassName('ux-menu')[0]);

      // Add blur handler to menu to close menu
      $menu.on('blur', close);

      // Add click event to menu
      $menu.on('click', (event) => {
        // Grab the clicked element
        let el = angular.element((event || window.event).target);

        // TODO: loop up to menu item stopping at menu

        // Eval the action with the value of the menu item
        $scope.$eval(uxDropdown, {
          menu: $menu,
          item: el,
          value: el.attr('value'),
          text: el.html()
        });

        // Close the menu
        close();
      });

      // Set the tabIndex on the menu to make it focusable
      $menu[0].tabIndex = 0;
    };

    // Open menu method
    const open = () => {
      // Initialize the menu
      init();

      // Append the menu to the document body
      try {
        $body.append($menu);
      } catch(e) {
        // no-op
      }

      // Position the menu
      $menu.css('left', offsetLeft($target[0]) + 'px');
      $menu.css('top', (offsetTop($target[0]) + $target[0].offsetHeight) + 'px');
      $menu.css('minWidth', $target[0].offsetWidth + 'px');

      // Set focus to the menu
      $menu[0].focus();

      // Add the pressed class to the target
      $target.addClass('ui-pressed');
    };

    // Close menu method
    const close = () => {
      // Append the menu back into the target
      try {
        $target.append($menu);
      } catch(e) {
        // no-op
      }

      // Remove the pressed class from the target
      $target.removeClass('ui-pressed');
    };

    // Initialization function
    $scope.init = (element, attributes) => {
      if (!attributes || !attributes.uxDropdown)
        return;

      // Store the target
      $target = element;

      // Add click handler to target to open menu
      $target.on('click', open);

      // Store the attributes
      uxDropdown = attributes.uxDropdown;

      // Initialize the menu
      init();
    };
  }])
  .directive('uxDropdown', () => {
    return {
      controller: 'DropdownController',
      link: ($scope, $element, $attributes) => $scope.init($element, $attributes),
      restrict: 'A'
    };
  });
