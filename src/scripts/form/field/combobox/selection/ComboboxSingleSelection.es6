angular
  .module('ux.angular')

  /**
   * @ngdoc service
   * @name ux.angular.service:ComboboxSingleSelection
   *
   * @description
   *  // TODO:
   */
  .service('ComboboxSingleSelection', () => {
    return class {
      constructor() {
        this.model = {
          value: undefined,
          text: undefined
        };
      }

      select(menu, option) {
        // Update the model
        this.model.value = option.attr('value');
        this.model.text = option.html();
      }

      isSelected(option) {
        return option.attr('value') === this.model.value;
      }
    };
  });
