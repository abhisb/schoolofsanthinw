// Code goes here
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}




app.config(function($stateProvider, $urlRouterProvider){
  
  $urlRouterProvider.when('', 'first');
  
  $stateProvider
  .state('first', {
    templateUrl: 'partials/first.html',
    controller: 'FirstCtrl',
    data:{
      
    }
  })
  .state('second', {
    templateUrl: 'partials/second.html',
    controller: 'SecondCtrl',
    data: {
      
    }
  });
  
});

app.controller('FirstCtrl', ['$scope', function($scope){
  
}]);

app.controller('SecondCtrl', ['$scope', '$stateParams', '$stateParams', '$state', function($scope,  $stateParams, $stateParams, $state){
  if($state.current.data && !isEmpty($state.current.data)){
     $scope.level = $state.current.data;
  }else{
    $scope.level = {
      information : "keep"
    }
  }
  $state.current.data = $scope.level;
  console.log("Second CTRL", $stateParams, $state);
}]);

app.controller('Tabs', ['$scope', '$stateParams', '$state', function($scope, $stateParams, $state){
  $scope.ui = {
    tabs : []
  };
  $scope.addSecondState = function(){
    $scope.ui.tabs.push({sref: 'second', name: "Second"});
  };
  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
  });
}]);


//app.factory 