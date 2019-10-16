angular
  .module('ux.angular')

  /**
   * @ngdoc service
   * @name ux.angular.service:ComboboxMultiSelection
   *
   * @description
   *  // TODO:
   */
  .service('ComboboxMultiSelection', () => {
    return class {
      constructor(options) {
        this.options = _.merge({
          noItemsText: '',
          multipleItemsText: '(Multiple Items Selected)',
          allItemsText: '(All Items Selected)',
          separator: ','
        }, options);

        this.model = {
          value: undefined,
          text: this.options.noItemsText
        };
      }

      select(menu, item) {
        // Toggle the selected attribute of the item
        if (item.attr('selected')) {
          item.removeAttr('selected');
        } else {
          item.attr('selected', true);
        }

        // Reset the selected items lists
        let selected = [];
        let values = [];

        // Find the items in the list
        let items = menu.find(this.itemSelector);

        // Update the selected items lists
        items.filter('[selected]').each((index, item) => {
          selected.push(item);
          values.push($(item).attr('value'));
        });

        // Update the model's value
        this.model.value = values.join(this.options.separator);

        // Update the model's text
        switch(selected.length) {
          case 0:
            this.model.text = this.options.noItemsText;
            break;

          case 1:
            this.model.text = $(items.filter('[selected]')[0]).html();
            break;

          case items.length:
            this.model.text = this.options.allItemsText;
            break;

          default:
            this.model.text = this.options.multipleItemsText;
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
  .directive('uxComboboxMultiselect', ['ComboboxMultiSelection', (ComboboxMultiSelection) => {
    return {
      link: ($scope, $element, $attributes, $controller) => $controller.setSelectService(
        new ComboboxMultiSelection($scope.$eval($attributes.uxComboboxMultiselect))
      ),
      priority: 1,
      require: 'uxCombobox',
      restrict: 'A'
    };
  }]);
