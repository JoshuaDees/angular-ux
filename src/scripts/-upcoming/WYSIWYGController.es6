angular.module('ux.angular')
  .controller('WYSIWYGController', ['$scope', $scope => {
    // Initialization function
    $scope.init = $element => document.execCommand('DefaultParagraphSeparator', false, 'p');

    // General execute command method
    $scope.exec = (params, value = null) => (Array.isArray(params) ? params : [params]).forEach(param => document.execCommand(param, false, value));

    // TODO: Insert a url link
    $scope.link = () => {
      var urlLink = prompt('Enter url link', '');

      if (urlLink != null) {
        $scope.exec('createLink', urlLink);
      }
    };

    // TODO: Insert an image
    $scope.image = () => {
      var imgSrc = prompt('Enter image location', '');

      if (imgSrc != null) {
        $scope.exec('insertimage', imgSrc);
      }
    };

    // TODO: Insert a table
    $scope.table = () => {
      // no-op
    };

    // TODO: Remove
    $scope.log = () => {
      console.log($scope.source);
    };
  }]);
