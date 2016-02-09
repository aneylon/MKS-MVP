// console.log("loggin basic");

// replace jquery with angular transitions???
$(document).ready(function(){
  // console.log('j-quezy fo sheezy');

  $( "#question" ).click(function() {
    $( "#answers" ).slideToggle( "fast", function() {
      // Animation complete.
    });
  });

  $("#nextButton").click(function(){
    $("#answers").slideUp("fast", function(){
      console.log("slide it up");
      // move to next item in list
    });
  });

});

var studyMe = angular.module('studyMe', [])
.controller('studyController', function($scope){

  $scope.curDeck = [];

  $scope.curQuestion = "Pick a deck to get started";
  $scope.answerOne = "Answer Part One";
  $scope.answerTwo = "Answer Part Two";

  $scope.jlptN3 = [
    ["one a", "one b", "one c"],
    ["two a", "two b", "two c"],
    ["three a", "three b", "three c"],
    ["four a", "four b", "four c"]
  ];

  $scope.clickedIt = function(){
    console.log('Clicked it');
  };

  $scope.loadSelected = function(){
  };

  $scope.shuffle = function(arr){
    // seems to shuffle before log is made????
    console.log('start', arr);
    for ( var i = 0; i < arr.length; i++ ) {
      var temp = arr[i];
      var rand = Math.floor(Math.random() * arr.length);
      console.log(rand);
      arr[i] = arr[rand];
      arr[rand] = temp;
    }
    console.log('end', arr);

    $scope.curQuestion = arr[0][0];
    $scope.answerOne = arr[0][1];
    $scope.answerTwo = arr[0][2];
  };

  $scope.nextCard = function(){
    $scope.shuffle($scope.jlptN3);
  };
});

// .factory()
// .service()

/*
var jlptN3 = [
  ["one a", "one b", "one c"],
  ["two a", "two b", "two c"],
  ["three a", "three b", "three c"],
  ["four a", "four b", "four c"]
];
*/