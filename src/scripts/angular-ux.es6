angular
  .module('angular-ux', ['ngSanitize'])
  .config(['$compileProvider', ($compileProvider) => {
    // Disable debug info from being displayed in Angular comments left for templating
    $compileProvider.debugInfoEnabled(false);
  }]);
