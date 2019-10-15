angular
  .module('ux.angular')

  /**
   * @ngdoc service
   * @name ux.angular.service:ComboboxSingleSelect
   *
   * @description
   *  // TODO:
   */
  .service('ComboboxSingleSelect', () => {
    return function($scope) {
      this.model = {
        value: undefined,
        text: undefined
      };

      this.select = (menu, item) => {
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
