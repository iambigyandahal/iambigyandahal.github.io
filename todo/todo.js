var app = angular.module("myApp", []);
app.controller("myCtrlr", function($scope) {
  $scope.products = ["Milk", "Bread", "Cheese"];
  $scope.products.reverse();
  $scope.addItem = function() {
    $scope.errorText = "";
    if(!$scope.addMe) {return;}
    if($scope.products.indexOf($scope.addMe) == -1) {
      $scope.products.unshift($scope.addMe);
    } else {
      $scope.errorText = "Item is already in list";
    }
  }
  $scope.removeItem = function(x) {
    $scope.products.splice(x, 1);
  }
});
