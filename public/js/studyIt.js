$(document).ready(function(){

  $("body").on('click', '#card', function(){
    $('#answers').slideToggle("fast");
  })

});

var studyMe = angular.module('studyMe', ['ngRoute','chart.js','firebase'])

.constant("myFirebase",{
  "url": "https://studyit.firebaseio.com/"
})

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

  $scope.data = [
    [$scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor()],
    [$scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor(), $scope.randomScalingFactor()]
  ];
  $scope.onClick = function (points, evt) {
  };
})

.controller('loginController', function($scope, $location, myFirebase){
  $scope.testMessage = " get you logged in ";
  $scope.userName = "";
  $scope.passWord = "";
  $scope.clickLogin = function(){
      $location.path( "/" );
        var ref = new Firebase(myFirebase.url);
        ref.authWithPassword({
          email    : "bobtony@firebase.com",
          password : "correcthorsebatterystaple"
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
        },{remember: "sessionOnly"});
  };
})

.controller('signupController', function($scope, $location, myFirebase){
  $scope.testMessage = " get you signed up ";
  $scope.userName = "";
  $scope.eMail = "";
  $scope.passWordOne = "";
  $scope.passWordTwo = "";
  $scope.clickSignup = function(){
    $location.path("/");
      var ref = new Firebase(myFirebase.url);
      ref.createUser({
        email    : "bobtony@firebase.com",
        password : "correcthorsebatterystaple"
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
  };
})

.controller('adminController', function($scope,$firebaseArray,myFirebase){
  $scope.testMessage = " add you some cards ";
  $scope.question = "";
  $scope.answer = "";
  $scope.explain = "";
  $scope.clickAdd = function(){
    var newRef = new Firebase(myFirebase.url + $scope.deck);
    $scope.data = $firebaseArray(newRef);
    $scope.data.$add({
      question : $scope.question,
      answer : $scope.answer,
      explain : $scope.explain
    });
  };
})

.controller('studyController', function($scope,$firebaseArray,myFirebase){
  var ref = new Firebase(myFirebase.url);

  $scope.logOut = function(){
    console.log("Log it out");
    ref.unauth();
  };

  $scope.testMessage = " select you a deck to get started ";

  $scope.selectedDeck = "";

  $scope.datas = $firebaseArray(ref);
  $scope.datas.$loaded()
    .then(function(){
      console.log("data is ", $scope.data);
    })
    .catch(function(err){
      console.log(err);
    })

  $scope.decks = [
    ["JLPT N3","jlptN3"],
    ["Sample Data","sampleData"],
    ["Security +", "securityPlus"]
  ];

  $scope.curDeck = [];
  $scope.curCart = 0;

  $scope.curQuestion = "";
  $scope.answerOne = "";
  $scope.answerTwo = "";

  $scope.jlptN3 = [
    ["山本さんはクラスの代表に選ばれた。","やまもと　さん　は　くらす　の　だいよう　に　えらばれた。","Mr. Yamamoto was chosen to represent the class"],
    ["ぐっすり寝たので、気持ちがいい。","ぐっすり　ねた　ので、　きもち　が　いい。","I feel good becuase I slept really well."],
    ["父が短気なのに対して、母の方は気が長い。","ちち　が　たんき　なのに　たいして、はは　の　ほう　はき　が　ながい。","Even though my father is short tempered compared to my mother is patient."]
  ];

  $scope.sampleData = [
    ["나는 한국어 읽을 수 없습니다","naneun hangug-eo ilg-eul su eobs-seubnida","I can\'t read korean."],
    ["日本語能力試験N3を合格したがまだ日本語が良く分からないなぁ。",
    "にほんご　のうりょく　しけん　N3　を　ごうがく　した　が　まだ　にほんご　が　よく　わからない　なぁ。",
    "Even though I passed the level three JLPT I still don't understand Japanese very well."],
    ["how much wood could a would chuck, chuck if a wood chuck could chuck wood?","shut up.","seriously."]
  ];

  $scope.securityPlus = [
    ["What kind of software is designed to gain administrative level access to a computer?","","Rootkit"],
    ["Which kind of fire extinguishers should be used to put out magnesium or titanium based fires?","","Class D"],
    ["How would you test the ability of a network that is isolated from the Internet by a perimeter network to detect and respond to a DoS attack?","","Penetration testing"]
  ];

  $scope.selectDeck = function(selected){
    $('#answers').slideUp('fast', function(){
      $scope.curCard = 0;
      if( $scope[selected] !== undefined ) {
        $scope.curDeck = $scope[selected];
        $scope.shuffle($scope.curDeck);
      }
    });
  };


  $scope.shuffle = function(arr){
    // seems to shuffle before log is made????
    for ( var i = 0; i < arr.length; i++ ) {
      var temp = arr[i];
      var rand = Math.floor(Math.random() * arr.length);
      arr[i] = arr[rand];
      arr[rand] = temp;
    }

    $scope.showCard($scope.curCard);
  };

  $scope.nextCard = function(){
    $('#answers').slideUp('fast', function(){
      if( $scope.curCard < ( $scope.curDeck.length - 1 ) ) {
        $scope.curCard += 1;
      } else {
        $scope.curCard = 0;
        $scope.shuffle($scope.curDeck);
      }
      $scope.showCard($scope.curCard);
    });
  };

  $scope.showCard = function(cardToShow){
    $scope.curQuestion = $scope.curDeck[cardToShow][0];
    $scope.answerOne = $scope.curDeck[cardToShow][1];
    $scope.answerTwo = $scope.curDeck[cardToShow][2];
  };

});

/*
// rules
{
  "rules": {
    "users": {
      "$uid": {
        // grants write access to the owner of this user account whose uid must exactly match the key ($uid)
        ".write": "auth !== null && auth.uid === $uid",

        // grants read access to any user who is logged in with an email and password
        ".read": "auth !== null && auth.provider === 'password'"
      }
    }
  }
}
*/

/*
// change email
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.changeEmail({
  oldEmail : "bobtony@firebase.com",
  newEmail : "bobtony@google.com",
  password : "correcthorsebatterystaple"
}, function(error) {
  if (error === null) {
    console.log("Email changed successfully");
  } else {
    console.log("Error changing email:", error);
  }
});
*/
/*
// change password
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.changePassword({
  email       : "bobtony@firebase.com",
  oldPassword : "correcthorsebatterystaple",
  newPassword : "neatsupersecurenewpassword"
}, function(error) {
  if (error === null) {
    console.log("Password changed successfully");
  } else {
    console.log("Error changing password:", error);
  }
});
*/
/*
// password reset email
var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.resetPassword({
  email : "bobtony@firebase.com"
}, function(error) {
  if (error === null) {
    console.log("Password reset email sent successfully");
  } else {
    console.log("Error sending password reset email:", error);
  }
});
*/