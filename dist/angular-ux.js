"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//====================================================================================================================
// Module:    ux.angular
// Optimized: Yes
// File:      src/scripts/angular-ux.es6
//====================================================================================================================
(function (module) {
  module.config(['$compileProvider', function ($compileProvider) {
    // Disable debug info from being displayed in Angular comments left for templating
    $compileProvider.debugInfoEnabled(false);
  }]); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/-upcoming/ColorPickerDirective.es6
  //--------------------------------------------------------------------------------------------------------------------

  module.directive('uxColorPicker', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '-upcoming/ColorPickerTemplate'
    };
  }); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/-upcoming/ContentEditableDirective.es6
  //--------------------------------------------------------------------------------------------------------------------

  module.directive('contenteditable', ['$sce', function ($sce) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function link(scope, element, attrs, ngModel) {
        // If the ng-model attribute is not present, do nothing
        if (!ngModel) {
          return;
        } // Update the model value


        var update = function update() {
          // Grab the current html
          var html = element.html(); // When we clear the content editable the browser leaves a <br> behind, strip this out

          if (html == '<br>') {
            html = '';
          } // Update the model value


          ngModel.$setViewValue(html);
        }; // Specify how UI should be updated when the model changes internally


        ngModel.$render = function () {
          element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
        }; // Listen for change events to enable updating


        element.on('blur keyup change', function () {
          scope.$evalAsync(update);
        }); // Update the initial model value

        update();
      }
    };
  }]); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/-upcoming/WYSIWYGController.es6
  //--------------------------------------------------------------------------------------------------------------------

  module.controller('WYSIWYGController', ['$scope', function ($scope) {
    // Initialization function
    $scope.init = function ($element) {
      return document.execCommand('DefaultParagraphSeparator', false, 'p');
    }; // General execute command method


    $scope.exec = function (params) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return (Array.isArray(params) ? params : [params]).forEach(function (param) {
        return document.execCommand(param, false, value);
      });
    }; // TODO: Insert a url link


    $scope.link = function () {
      var urlLink = prompt('Enter url link', '');

      if (urlLink != null) {
        $scope.exec('createLink', urlLink);
      }
    }; // TODO: Insert an image


    $scope.image = function () {
      var imgSrc = prompt('Enter image location', '');

      if (imgSrc != null) {
        $scope.exec('insertimage', imgSrc);
      }
    }; // TODO: Insert a table


    $scope.table = function () {// no-op
    }; // TODO: Remove


    $scope.log = function () {
      console.log($scope.source);
    };
  }]); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/-upcoming/WYSIWYGDirective.es6
  //--------------------------------------------------------------------------------------------------------------------

  module.directive('uxWysiwyg', function () {
    return {
      controller: 'WYSIWYGController',
      link: function link(scope, element) {
        return scope.init(element);
      },
      replace: true,
      restrict: 'A',
      scope: true,
      templateUrl: '-upcoming/WYSIWYGTemplate',
      transclude: true
    };
  }); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/form/field/combobox/Combobox.es6
  //--------------------------------------------------------------------------------------------------------------------

  module
  /**
   * @ngdoc controller
   * @name ux.angular.controller:Combobox
   *
   * @description
   *  Defines the controller that runs the {@link angular-ux.directive:uxCombobox Combobox} directive.
   */
  .controller('Combobox', ['$scope', '$element', 'ComboboxSingleSelection', function ($scope, $element, ComboboxSingleSelection) {
    /**
     * Cancel opening the menu if clicking in the input and the combobox is editable.
     */
    $scope.cancelOpen = function (event) {
      // If the combobox is editable, stop the default event propagation
      if ($scope.editableService) {
        event.stopPropagation();
      }
    };
    /**
     * Initializes the controller.
     */


    $scope.initialize = function (attributes, ngModel) {
      // Store the attributes to the scope
      $scope.attributes = attributes; // Store the ng-model controller

      $scope.ngModel = ngModel;
    };
    /**
     * Selects one of the items in the combobox's list.
     */


    $scope.select = function (menu, item) {
      var apply = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // Select the item using the select service
      $scope.selectService.select(menu, item); // Update the ng-model if defined

      if ($scope.ngModel) {
        $scope.ngModel.$setViewValue($scope.selectService.model.value);
      } // Apply the changes if needed


      apply && $scope.$apply();
    };
    /**
     * Sets the editable service.
     */


    $scope.setEditableService = function (editableService) {
      return $scope.editableService = editableService;
    };
    /**
     * Sets the select service.
     */


    $scope.setSelectService = function (selectService) {
      // Set the select service's item selector
      selectService.itemSelector = '.ux-menuitem'; // Set the select service

      $scope.selectService = selectService;
    }; // Set the necessary services


    $scope.setSelectService(new ComboboxSingleSelection()); // Return the scope

    return $scope;
  }])
  /**
   * @ngdoc directive
   * @name ux.angular.directive:uxCombobox
   *
   * @description
   *  Defines the Combobox directive.
     * @example
   *
   *  <ux-combobox [name] [ng-model="{model}"] [placeholder="{placeholder}"] [required] [ux-combobox-editable] [ux-combobox-multiselect]>
   *    <!-- Options -->
   *  </ux-combobox>
   */
  .directive('uxCombobox', function () {
    return {
      controller: 'Combobox',
      link: function link($scope, $element, $attributes, ngModel) {
        return $scope.initialize($attributes, ngModel);
      },
      replace: true,
      require: '?ngModel',
      restrict: 'E',
      scope: {},
      templateUrl: 'form/field/combobox/Combobox',
      transclude: true
    };
  }); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/form/field/combobox/Option.es6
  //--------------------------------------------------------------------------------------------------------------------

  module
  /**
   * @ngdoc directive
   * @name ux.angular.directive:uxOption
   *
   * @description
   *  // TODO:
   */
  .directive('uxOption', function () {
    return {
      link: function link($scope, $element, $attributes) {
        if ($attributes.selected !== undefined) {
          $scope.$parent.select(null, $element);
        }
      },
      replace: true,
      restrict: 'E',
      templateUrl: 'form/field/combobox/Option',
      transclude: true
    };
  }); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/form/field/combobox/editable/ComboboxEditable.es6
  //--------------------------------------------------------------------------------------------------------------------

  module
  /**
   * @ngdoc service
   * @name ux.angular.service:ComboboxEditable
   *
   * @description
   *  // TODO:
   */
  .service('ComboboxEditable', function () {
    return function () {};
  })
  /**
   * @ngdoc directive
   * @name ux.angular.directive:uxComboboxEditable
   *
   * @description
   *  // TODO:
   */
  .directive('uxComboboxEditable', ['ComboboxEditable', function (ComboboxEditable) {
    return {
      link: function link($scope, $element, $attributes, $controller) {
        return $controller.setEditableService(new ComboboxEditable());
      },
      priority: 1,
      require: 'uxCombobox',
      restrict: 'A'
    };
  }]); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/form/field/combobox/selection/ComboboxMultiSelection.es6
  //--------------------------------------------------------------------------------------------------------------------

  module
  /**
   * @ngdoc service
   * @name ux.angular.service:ComboboxMultiSelection
   *
   * @description
   *  // TODO:
   */
  .service('ComboboxMultiSelection', function () {
    return (
      /*#__PURE__*/
      function () {
        function _class(options) {
          _classCallCheck(this, _class);

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

        _createClass(_class, [{
          key: "select",
          value: function select(menu, item) {
            // Toggle the selected attribute of the item
            if (item.attr('selected')) {
              item.removeAttr('selected');
            } else {
              item.attr('selected', true);
            } // Reset the selected items lists


            var selected = [];
            var values = []; // Find the items in the list

            var items = menu.find(this.itemSelector); // Update the selected items lists

            items.filter('[selected]').each(function (index, item) {
              selected.push(item);
              values.push($(item).attr('value'));
            }); // Update the model's value

            this.model.value = values.join(this.options.separator); // Update the model's text

            switch (selected.length) {
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
          }
        }]);

        return _class;
      }()
    );
  })
  /**
   * @ngdoc directive
   * @name ux.angular.directive:uxComboboxMultiselect
   *
   * @description
   *  // TODO:
   */
  .directive('uxComboboxMultiselect', ['ComboboxMultiSelection', function (ComboboxMultiSelection) {
    return {
      link: function link($scope, $element, $attributes, $controller) {
        return $controller.setSelectService(new ComboboxMultiSelection($scope.$eval($attributes.uxComboboxMultiselect)));
      },
      priority: 1,
      require: 'uxCombobox',
      restrict: 'A'
    };
  }]); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/form/field/combobox/selection/ComboboxSingleSelection.es6
  //--------------------------------------------------------------------------------------------------------------------

  module
  /**
   * @ngdoc service
   * @name ux.angular.service:ComboboxSingleSelection
   *
   * @description
   *  // TODO:
   */
  .service('ComboboxSingleSelection', function () {
    return (
      /*#__PURE__*/
      function () {
        function _class2() {
          _classCallCheck(this, _class2);

          this.model = {
            value: undefined,
            text: undefined
          };
        }

        _createClass(_class2, [{
          key: "select",
          value: function select(menu, item) {
            // Update the model
            this.model.value = item.attr('value');
            this.model.text = item.html();

            if (menu) {
              menu.find('[selected]').removeAttr('selected');
              item.attr('selected', true);
            }
          }
        }]);

        return _class2;
      }()
    );
  }); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/form/field/Dropdown.es6
  //--------------------------------------------------------------------------------------------------------------------

  module.controller('DropdownController', ['$scope', function ($scope) {
    // Element variables
    var $body = angular.element(document.body);
    var $target;
    var $menu;
    var uxDropdown; // Helper methods

    var offsetLeft = function offsetLeft(element) {
      return element.offsetLeft + (element.offsetParent ? offsetLeft(element.offsetParent) : 0);
    };

    var offsetTop = function offsetTop(element) {
      return element.offsetTop + (element.offsetParent ? offsetTop(element.offsetParent) : 0);
    };

    var init = function init() {
      // If the menu has already been initialized or does not exist
      if ($menu || !$target[0].getElementsByClassName('ux-menu')[0]) {
        // Do nothing
        return;
      } // Store the menu


      $menu = angular.element($target[0].getElementsByClassName('ux-menu')[0]); // Add blur handler to menu to close menu

      $menu.on('blur', close); // Add click event to menu

      $menu.on('click', function (event) {
        // Grab the clicked element
        var el = angular.element((event || window.event).target); // TODO: loop up to menu item stopping at menu
        // Eval the action with the value of the menu item

        $scope.$eval(uxDropdown, {
          menu: $menu,
          item: el,
          value: el.attr('value'),
          text: el.html()
        }); // Close the menu

        close();
      }); // Set the tabIndex on the menu to make it focusable

      $menu[0].tabIndex = 0;
    }; // Open menu method


    var open = function open() {
      // Initialize the menu
      init(); // Append the menu to the document body

      try {
        $body.append($menu);
      } catch (e) {} // no-op
      // Position the menu


      $menu.css('left', offsetLeft($target[0]) + 'px');
      $menu.css('top', offsetTop($target[0]) + $target[0].offsetHeight + 'px');
      $menu.css('minWidth', $target[0].offsetWidth + 'px'); // Set focus to the menu

      $menu[0].focus(); // Add the pressed class to the target

      $target.addClass('ui-pressed');
    }; // Close menu method


    var close = function close() {
      // Append the menu back into the target
      try {
        $target.append($menu);
      } catch (e) {} // no-op
      // Remove the pressed class from the target


      $target.removeClass('ui-pressed');
    }; // Initialization function


    $scope.init = function (element, attributes) {
      if (!attributes || !attributes.uxDropdown) return; // Store the target

      $target = element; // Add click handler to target to open menu

      $target.on('click', open); // Store the attributes

      uxDropdown = attributes.uxDropdown; // Initialize the menu

      init();
    };
  }]).directive('uxDropdown', function () {
    return {
      controller: 'DropdownController',
      link: function link($scope, $element, $attributes) {
        return $scope.init($element, $attributes);
      },
      restrict: 'A'
    };
  }); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/menu/Menu.es6
  //--------------------------------------------------------------------------------------------------------------------

  module.directive('uxMenu', function () {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: 'menu/Menu',
      transclude: true
    };
  }); //--------------------------------------------------------------------------------------------------------------------
  // File: src/scripts/menu/MenuItem.es6
  //--------------------------------------------------------------------------------------------------------------------

  module.directive('uxMenuitem', function () {
    return {
      link: function link($scope, $element, $attributes) {
        if ($attributes.selected !== undefined) {
          $scope.$parent.select($element.attr('value'), $element.html());
        }
      },
      replace: true,
      restrict: 'E',
      templateUrl: 'menu/MenuItem',
      transclude: true
    };
  });
})(angular.module('ux.angular', ['ngSanitize']));
angular.module('ux.angular').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('-upcoming/ColorPickerTemplate',
    '<div class="ui-padding ui-rows ux-color-picker"><div class="ui-cols ui-padding-bottom"><li value="rgb(0, 0, 0)" style="background: rgb(0, 0, 0);"></li><li value="rgb(68, 68, 68)" style="background: rgb(68, 68, 68);"></li><li value="rgb(102, 102, 102)" style="background: rgb(102, 102, 102);"></li><li value="rgb(153, 153, 153)" style="background: rgb(153, 153, 153);"></li><li value="rgb(204, 204, 204)" style="background: rgb(204, 204, 204);"></li><li value="rgb(238, 238, 238)" style="background: rgb(238, 238, 238);"></li><li value="rgb(243, 243, 243)" style="background: rgb(243, 243, 243);"></li><li value="rgb(255, 255, 255)" style="background: rgb(255, 255, 255);"></li></div><div class="ui-cols ui-padding-bottom"><li value="rgb(255, 0, 0)" style="background: rgb(255, 0, 0);"></li><li value="rgb(255, 153, 0)" style="background: rgb(255, 153, 0);"></li><li value="rgb(255, 255, 0)" style="background: rgb(255, 255, 0);"></li><li value="rgb(0, 255, 0)" style="background: rgb(0, 255, 0);"></li><li value="rgb(0, 255, 255)" style="background: rgb(0, 255, 255);"></li><li value="rgb(0, 0, 255)" style="background: rgb(0, 0, 255);"></li><li value="rgb(153, 0, 255)" style="background: rgb(153, 0, 255);"></li><li value="rgb(255, 0, 255)" style="background: rgb(255, 0, 255);"></li></div><div class=ui-cols><li value="rgb(244, 204, 204)" style="background: rgb(244, 204, 204);"></li><li value="rgb(252, 229, 205)" style="background: rgb(252, 229, 205);"></li><li value="rgb(255, 242, 204)" style="background: rgb(255, 242, 204);"></li><li value="rgb(217, 234, 211)" style="background: rgb(217, 234, 211);"></li><li value="rgb(208, 224, 227)" style="background: rgb(208, 224, 227);"></li><li value="rgb(207, 226, 243)" style="background: rgb(207, 226, 243);"></li><li value="rgb(217, 210, 233)" style="background: rgb(217, 210, 233);"></li><li value="rgb(234, 209, 220)" style="background: rgb(234, 209, 220);"></li></div><div class=ui-cols><li value="rgb(234, 153, 153)" style="background: rgb(234, 153, 153);"></li><li value="rgb(249, 203, 156)" style="background: rgb(249, 203, 156);"></li><li value="rgb(255, 229, 153)" style="background: rgb(255, 229, 153);"></li><li value="rgb(182, 215, 168)" style="background: rgb(182, 215, 168);"></li><li value="rgb(162, 196, 201)" style="background: rgb(162, 196, 201);"></li><li value="rgb(159, 197, 232)" style="background: rgb(159, 197, 232);"></li><li value="rgb(180, 167, 214)" style="background: rgb(180, 167, 214);"></li><li value="rgb(213, 166, 189)" style="background: rgb(213, 166, 189);"></li></div><div class=ui-cols><li value="rgb(224, 102, 102)" style="background: rgb(224, 102, 102);"></li><li value="rgb(246, 178, 107)" style="background: rgb(246, 178, 107);"></li><li value="rgb(255, 217, 102)" style="background: rgb(255, 217, 102);"></li><li value="rgb(147, 196, 125)" style="background: rgb(147, 196, 125);"></li><li value="rgb(118, 165, 175)" style="background: rgb(118, 165, 175);"></li><li value="rgb(111, 168, 220)" style="background: rgb(111, 168, 220);"></li><li value="rgb(142, 124, 195)" style="background: rgb(142, 124, 195);"></li><li value="rgb(194, 123, 160)" style="background: rgb(194, 123, 160);"></li></div><div class=ui-cols><li value="rgb(204, 0, 0)" style="background: rgb(204, 0, 0);"></li><li value="rgb(230, 145, 56)" style="background: rgb(230, 145, 56);"></li><li value="rgb(241, 194, 50)" style="background: rgb(241, 194, 50);"></li><li value="rgb(106, 168, 79)" style="background: rgb(106, 168, 79);"></li><li value="rgb(69, 129, 142)" style="background: rgb(69, 129, 142);"></li><li value="rgb(61, 133, 198)" style="background: rgb(61, 133, 198);"></li><li value="rgb(103, 78, 167)" style="background: rgb(103, 78, 167);"></li><li value="rgb(166, 77, 121)" style="background: rgb(166, 77, 121);"></li></div><div class=ui-cols><li value="rgb(153, 0, 0)" style="background: rgb(153, 0, 0);"></li><li value="rgb(180, 95, 6)" style="background: rgb(180, 95, 6);"></li><li value="rgb(191, 144, 0)" style="background: rgb(191, 144, 0);"></li><li value="rgb(56, 118, 29)" style="background: rgb(56, 118, 29);"></li><li value="rgb(19, 79, 92)" style="background: rgb(19, 79, 92);"></li><li value="rgb(11, 83, 148)" style="background: rgb(11, 83, 148);"></li><li value="rgb(53, 28, 117)" style="background: rgb(53, 28, 117);"></li><li value="rgb(116, 27, 71)" style="background: rgb(116, 27, 71);"></li></div><div class=ui-cols><li value="rgb(102, 0, 0)" style="background: rgb(102, 0, 0);"></li><li value="rgb(120, 63, 4)" style="background: rgb(120, 63, 4);"></li><li value="rgb(127, 96, 0)" style="background: rgb(127, 96, 0);"></li><li value="rgb(39, 78, 19)" style="background: rgb(39, 78, 19);"></li><li value="rgb(12, 52, 61)" style="background: rgb(12, 52, 61);"></li><li value="rgb(7, 55, 99)" style="background: rgb(7, 55, 99);"></li><li value="rgb(32, 18, 77)" style="background: rgb(32, 18, 77);"></li><li value="rgb(76, 17, 48)" style="background: rgb(76, 17, 48);"></li></div></div>'
  );


  $templateCache.put('-upcoming/WYSIWYGTemplate',
    '<div class=ui-rows><div class="ui-border-bottom ui-cols ui-toolbar"><div class=ui-rows><div class=ui-cols><button class="ui-button ui-flex-3" title=Font ux-dropdown="exec(\'fontName\', value)">Font<ul class=ux-menu><ux-menuitem value=Arial style="font-family: \'Arial\';">Arial</ux-menuitem><ux-menuitem value="Courier New" style="font-family: \'Courier New\';">Courier New</ux-menuitem><ux-menuitem value=Georgia style="font-family: \'Georgia\';">Georgia</ux-menuitem><ux-menuitem value=Helvetica style="font-family: \'Helvetica\';">Helvetica</ux-menuitem><ux-menuitem value="Times New Roman" style="font-family: \'Times New Roman\';">Times New Roman</ux-menuitem><ux-menuitem value=Verdana style="font-family: \'Verdana\';">Verdana</ux-menuitem></ul></button> <button class="ui-button ui-flex-2" title="Font Size" ux-dropdown="exec(\'fontSize\', value)">Size<ul class=ux-menu><ux-menuitem value=1>8pt</ux-menuitem><ux-menuitem value=2>10pt</ux-menuitem><ux-menuitem value=3>12pt</ux-menuitem><ux-menuitem value=4>14pt</ux-menuitem><ux-menuitem value=5>18pt</ux-menuitem><ux-menuitem value=6>24pt</ux-menuitem><ux-menuitem value=7>36pt</ux-menuitem></ul></button> <button class="ui-button ui-flex-3" title="Font Size" ux-dropdown="exec(\'formatBlock\', value)">Format<ul class=ux-menu><ux-menuitem value="<p>">Paragraph</ux-menuitem><ux-menuitem value="<h1>" style="font-weight: bold;">Heading 1</ux-menuitem><ux-menuitem value="<h2>" style="font-weight: bold;">Heading 2</ux-menuitem><ux-menuitem value="<h3>" style="font-weight: bold;">Heading 3</ux-menuitem><ux-menuitem value="<h4>" style="font-weight: bold;">Heading 4</ux-menuitem><ux-menuitem value="<h5>" style="font-weight: bold;">Heading 5</ux-menuitem><ux-menuitem value="<h6>" style="font-weight: bold;">Heading 6</ux-menuitem><ux-menuitem value="<pre>" style="font-family: \'Courier New\';">Preformatted</ux-menuitem></ul></button></div><div class=ui-cols><button class=ui-button ng-click="exec(\'bold\')" title=Bold><i class="fa fa-bold"></i></button> <button class=ui-button ng-click="exec(\'italic\')" title=Italic><i class="fa fa-italic"></i></button> <button class=ui-button ng-click="exec(\'underline\')" title=Underline><i class="fa fa-underline"></i></button> <button class=ui-button ng-click="exec(\'strikethrough\')" title=Strikethrough><i class="fa fa-strikethrough"></i></button> <button class=ui-button ng-click="exec(\'subscript\')" title=Subscript><i class="fa fa-subscript"></i></button> <button class=ui-button ng-click="exec(\'superscript\')" title=Superscript><i class="fa fa-superscript"></i></button><hr/><button class=ui-button title="Font Color" ux-dropdown="exec([\'foreColor\'], value)"><i class="fa fa-paint-brush"></i><ul class=ux-menu><ux-color-picker></ux-color-picker></ul></button> <button class=ui-button title="Background Color" ux-dropdown="exec([\'hiliteColor\', \'backColor\'], value)"><i class="fa fa-fill-drip"></i><ul class=ux-menu><ux-color-picker></ux-color-picker></ul></button></div><div class="ui-spacing ui-text-center ui-text-xs">Font</div></div><hr/><div class=ui-rows><div class=ui-cols><button class=ui-button ng-click="exec(\'insertunOrderedList\')" title="Create Bulleted List"><i class="fa fa-list-ul"></i></button> <button class=ui-button ng-click="exec(\'insertOrderedList\')" title="Create Ordered List"><i class="fa fa-list-ol"></i></button><hr/><button class=ui-button ng-click="exec(\'outdent\')" title="Decrease Indent"><i class="fa fa-outdent"></i></button> <button class=ui-button ng-click="exec(\'indent\')" title="Increase Indent"><i class="fa fa-indent"></i></button></div><div class=ui-cols><button class=ui-button ng-click="exec(\'justifyLeft\')" title="Align Left"><i class="fa fa-align-left"></i></button> <button class=ui-button ng-click="exec(\'justifyCenter\')" title="Align Center"><i class="fa fa-align-center"></i></button> <button class=ui-button ng-click="exec(\'justifyRight\')" title="Align Right"><i class="fa fa-align-right"></i></button> <button class=ui-button ng-click="exec(\'justifyFull\')" title=Justify><i class="fa fa-align-justify"></i></button></div><div class="ui-spacing ui-text-center ui-text-xs">Paragraph</div></div><hr/><div class=ui-rows><div class=ui-cols><button class=ui-button ng-click="exec(\'insertHorizontalRule\')" title="Insert Horizontal Rule"><i class="fa fa-minus"></i></button> <button class=ui-button ng-click=link() title="Insert Link"><i class="fa fa-link"></i></button> <button class=ui-button ng-click="exec(\'unlink\')" title="Remove Link"><i class="fa fa-unlink"></i></button></div><div class=ui-cols><button class=ui-button ng-click=symbol() title="Insert Symbol"><i class="fa fa-dollar-sign"></i></button> <button class=ui-button ng-click=image() title="Insert Image"><i class="fa fa-image"></i></button> <button class=ui-button ng-click=table() title="Insert Table"><i class="fa fa-table"></i></button></div><div class="ui-spacing ui-text-center ui-text-xs">Insert</div></div><hr/></div><div class="ui-editable ui-flex ui-padding-left-double ui-padding-right-double" contenteditable ng-transclude ng-model=source style="font-family: Verdana; font-size: 10pt;"></div><div class="ui-border-top ui-cols"><div class=ui-flex></div><div class="ui-border-left ui-padding ui-padding-left-double ui-padding-right-double ui-text-s">Length: {{ source.length }}</div></div><div class="ui-border-top ui-toolbar"><button class=ui-button ng-click=log()>View Source</button></div></div>'
  );


  $templateCache.put('form/field/combobox/Combobox',
    '<span class="ui-cols ux-combobox" tabindex=0 ux-dropdown="select(menu, item, true)"><input name="{{ attributes.name }}" ng-model=selectService.model.value ng-required=attributes.required type=hidden /> <input class="ui-flex ux-combobox-value" ng-click=cancelOpen($event) ng-readonly=!editableService ng-model=selectService.model.text placeholder="{{ attributes.placeholder || \' \' }}"/> <span class=ux-trigger></span><ux-menu><div ng-transclude></div></ux-menu></span>'
  );


  $templateCache.put('form/field/combobox/Option',
    '<li class="ux-menuitem ux-option" ng-transclude></li>'
  );


  $templateCache.put('menu/Menu',
    '<ul class=ux-menu ng-transclude></ul>'
  );


  $templateCache.put('menu/MenuItem',
    '<li class=ux-menuitem ng-transclude></li>'
  );

}]);
