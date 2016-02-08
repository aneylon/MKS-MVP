console.log("loggin basic");

$(document).ready(function(){
  console.log('j-quezy fo sheezy');
});

var studyMe = angular.module('studyMe', [])
.controller('studyController', function($scope){
  $scope.testOne = "Test One";
  $scope.clickedIt = function(){
    console.log('Clicked it');
  };
});
// .factory()
// .service()