var redditApp = angular.module('redditApp',[]);

redditApp.controller('SearchCtrl', ['$scope', '$http', function($scope, $http){
  $scope.searchTerm = '';
  $scope.lastSearch = '';
  $scope.lastIndex = '';
  $scope.results = [];

// LOCAL STORAGE
  // var taco = [1,2,3];
  // window.localStorage.taco=JSON.stringify(taco);
  //converts the data to a string "[1,2,3]" and stores it in .taco
  if(localStorage.length === 0) {
     $scope.history = [];
   } else {
    $scope.history = JSON.parse(localStorage.getItem('$scope.history'));
   }

  $scope.remove = function(index){
  $scope.history.splice(index, 1);
  localStorage.setItem('$scope.history', JSON.stringify($scope.history));
  }


  $scope.search = function() {
    var req = {
      url: "http://www.reddit.com/search.json?q=" + $scope.searchTerm,
      method: 'GET'
    }
    $http(req).then(function success(res) {
    $scope.results = [];
    var redditData = res.data.data.children
    $scope.history.unshift($scope.searchTerm);
       localStorage.setItem('$scope.history', JSON.stringify($scope.history));
 
       for (i=0; i<redditData.length; i++){
         var entry1 = redditData[i].data;
         // console.log(entry1);
         $scope.results.push(entry1);
       }
 
       // console.log($scope.results);
     }, function error(res){
       console.log("error: ",res)
     })
   }

  


}]);

console.log('this file is running.');