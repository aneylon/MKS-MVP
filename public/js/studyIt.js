// console.log("loggin basic");

// replace jquery with angular transitions???
$(document).ready(function(){
  // console.log('j-quezy fo sheezy');

  $("body").on('click', '#card', function(){
    $('#answers').slideToggle("fast");
  })
  $("body").on('click', '#nextButton', function(){
    $('#answers').slideUp('fast');
  })
/*
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
*/
});

var studyMe = angular.module('studyMe', ['ngRoute','chart.js'])
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
  $scope.randomScalingFactor = function(){
    return Math.round(Math.random()*100)
  };
  $scope.testMessage = " this is all of the stats ";

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  $scope.data = [
    [$scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor()],
    [$scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor()]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
})

.controller('loginController', function($scope, $location){
  $scope.testMessage = " get you logged in ";
  $scope.userName = "";
  $scope.passWord = "";
  $scope.clickLogin = function(){
      console.log('clicked login');
      console.log('loggin in : ', $scope.userName, $scope.passWord);
      $location.path( "/" );
  };
})

.controller('signupController', function($scope, $location){
  $scope.testMessage = " get you signed up ";
  $scope.userName = "";
  $scope.eMail = "";
  $scope.passWordOne = "";
  $scope.passWordTwo = "";
  $scope.clickSignup = function(){
    console.log('clicked signup');
    console.log($scope.userName, $scope.eMail, $scope.passWordOne, $scope.passWordTwo);
    $location.path("/");
  };
})

.controller('adminController', function($scope){
  $scope.testMessage = " add you some cards ";
  $scope.deck = "";
  $scope.question = "";
  $scope.answer = "";
  $scope.explain = "";
  $scope.clickAdd = function(){
    console.log('clicked add');
    console.log('added : ', $scope.question, $scope.answer, $scope.explain, ' to ', $scope.deck)
  };
})

.controller('studyController', function($scope){
  $scope.testMessage = " select you a deck to get started ";

  $scope.data = {
    one: 'one',
    two: 'two',
    three: 'three'
  };

  $scope.getDivision = function($scope) {
      $scope.divisions = data;
      $scope.update = function (a) {
          console.log(a);
      }
  }

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

  $scope.sampleData = [
    ["나는 한국어 읽을 수 없습니다","naneun hangug-eo ilg-eul su eobs-seubnida","I can\'t read korean."],
    ["日本語能力試験N3を合格したがまだ日本語が良く分からないなぁ。",
    "にほんご　のうりょく　しけん　N3　を　ごうがく　した　が　まだ　にほんご　が　よく　わからない　なぁ。",
    "Even though I passed the level three JLPT I still don't understand Japanese very well."],
    ["how much wood could a would chuck, chuck if a wood chuck could chuck wood?","shut up.","seriously."]
  ];

  $scope.selectDeck = function(){
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
    $scope.shuffle($scope.sampleData);
  };
});

// .factory()
// .service()