angular
  .module('ux.angular')

  /**
   * @ngdoc service
   * @name ux.angular.service:ComboboxMultiSelect
   *
   * @description
   *  // TODO:
   */
  .service('ComboboxMultiSelect', () => {
    return function($scope, itemSelector) {
      let selected = [];
      let values = [];

      this.model = {
        value: undefined,
        text: undefined
      };

      this.select = (menu, item) => {
        // Toggle the selected attribute of the item
        if (item.attr('selected')) {
          item.removeAttr('selected');
        } else {
          item.attr('selected', true);
        }

        // Reset the selected items lists
        selected = [];
        values = [];

        // Find the items in the list
        let items = menu.find(itemSelector);

        // Update the selected items lists
        items.filter('[selected]').each((index, item) => {
          selected.push(item);
          values.push($(item).attr('value'));
        });

        // Update the model's value
        this.model.value = values.join(', ');

        // Update the model's text
        switch(selected.length) {
          case 0:
            this.model.text = '';
            break;

          case 1:
            this.model.text = $(items.filter('[selected]')[0]).html();
            break;

          case items.length:
            this.model.text = '(All Items Selected)';
            break;

          default:
            this.model.text = '(Multiple Items Selected)';
            break;
        }
      };
    };
  })

  /**
   * @ngdoc directive
   * @name ux.angular.directive:uxComboboxMultiselect
   *
   * @description
   *  // TODO:
   */
  .directive('uxComboboxMultiselect', ['ComboboxMultiSelect', (ComboboxMultiSelect) => {
    return {
      link: ($scope, $element, $attributes, $controller) => $controller.setSelectService(ComboboxMultiSelect),
      priority: 1,
      require: 'uxCombobox',
      restrict: 'A'
    };
  }]);
