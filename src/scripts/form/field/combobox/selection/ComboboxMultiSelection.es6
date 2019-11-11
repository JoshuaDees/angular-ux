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
      constructor(combobox, options) {
        this.combobox = combobox;

        this.options = _.merge({
          noItemsText: '',
          multipleItemsText: '(Multiple Items Selected)',
          allItemsText: '(All Items Selected)',
          separator: ','
        }, options);

        this.selected = [];

        this.model = {
          value: undefined,
          text: this.options.noItemsText
        };
      }

      select(menu = this.combobox.find('ux-menu, .ux-menu'), option) {
        // Update the list of selected values
        this.selected = _.xor(this.selected, [option.attr('value')]);

        // Update the model's value
        this.model.value = this.selected.join(this.options.separator);

        // Update the model's text
        switch(this.selected.length) {
          case 0:
            this.model.text = this.options.noItemsText;
            break;

          case 1:
            this.model.text = this.selected[0];
            break;

          case menu.find('.ux-menuitem').length:
            this.model.text = this.options.allItemsText;
            break;

          default:
            this.model.text = this.options.multipleItemsText;
            break;
        }
      }

      isSelected(option) {
        return this.selected.includes(option.attr('value'));
      }
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
        new ComboboxMultiSelection($element, $scope.$eval($attributes.uxComboboxMultiselect))
      ),
      priority: 1,
      require: 'uxCombobox',
      restrict: 'A'
    };
  }]);
