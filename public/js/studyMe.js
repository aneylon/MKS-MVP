console.log("loggin basic");

$(document).ready(function(){
  console.log('j-quezy fo sheezy');

  $( "#question" ).click(function() {
    $( "#answers" ).slideToggle( "fast", function() {
      // Animation complete.
    });
  });

  $("#nextButton").click(function(){
    $("#answers").slideUp("fast", function(){
      console.log("slide it up");
    });
  });

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
