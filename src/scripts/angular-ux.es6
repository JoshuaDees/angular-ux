angular
  .module('ux.angular', ['ngSanitize'])
  .config(['$compileProvider', ($compileProvider) => {
    // Disable debug info from being displayed in Angular comments left for templating
    $compileProvider.debugInfoEnabled(false);
  }]);
