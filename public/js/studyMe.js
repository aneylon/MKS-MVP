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

var jlptN3 = [
  ["one a", "one b", "one c"],
  ["two a", "two b", "two c"],
  ["three a", "three b", "three c"],
  ["four a", "four b", "four c"]
];
