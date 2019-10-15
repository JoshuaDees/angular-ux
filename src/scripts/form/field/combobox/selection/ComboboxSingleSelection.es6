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

      select(menu, item) {
        // Update the model
        this.model.value = item.attr('value');
        this.model.text = item.html();

        if (menu) {
          menu.find('[selected]').removeAttr('selected');
          item.attr('selected', true);
        }
      };
    };
  });
