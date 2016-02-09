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

var studyMe = angular.module('studyMe', ['ngRoute'])
.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'pages/study.html',
      controller : 'studyController'
    })
    .when('/login', {
      templateUrl : 'pages/login.html',
      controller : 'loginController'
    })
    .when('/signup', {
      templateUrl : 'pages/signup.html',
      controller : 'signupController'
    })
    .when('/stats', {
      templateUrl : 'pages/stats.html',
      controller : 'statsController'
    })

    .when('/admin', {
      templateUrl : 'pages/admin.html',
      controller : 'adminController'
    });
})

.controller('statsController', function($scope){
  $scope.testMessage = " this is all of the stats ";
})

.controller('loginController', function($scope){
  $scope.testMessage = " this is where you login ";
})

.controller('signupController', function($scope){
  $scope.testMessage = " this is where you sign up ";
})

.controller('adminController', function($scope){
  $scope.testMessage = " this is where you add cards ";
})

.controller('studyController', function($scope){
  $scope.testMessage = " this is the main thinger ";

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