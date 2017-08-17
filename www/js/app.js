// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('dashboard',{
      cache:false,
      url:'/dashboard',
      templateUrl:'app/dashboard/dashboard.html',
      controller: 'DashboardCtrl'
    })
    $urlRouterProvider.otherwise('/dashboard')
})
.controller('DashboardCtrl', function ($scope, Apiservices, $ionicLoading) {
  $scope.details = {};
  $scope.details.word = 'Thesaurasize';
  $scope.synonymsarray = [];
  $scope.synonymdefination = '';
  $scope.linkClicked = function () {
    $scope.synonymdefination = '';
    $scope.synonymsarray = [];
    $scope.details.synonymTitle = 'Searching for ' + $scope.details.word + ' synonyms and defination ...';
    $ionicLoading.show({templateUrl: 'templates/spinner.html'});
    Apiservices.getsynonymsanddefination($scope.details.word).then(function (res) {
      console.info(res);
      $ionicLoading.hide();
      if (res) {
        for (var i = 0; i < res.length; i++) {
          console.info('how mant times i cakked');
          if (res[i].hasOwnProperty('synonyms')) {
            $scope.synonymsarray = $scope.synonymsarray.concat(res[i].synonyms);
            $scope.synonymdefination = $scope.synonymdefination + res[i].definition + '<br/>'
          } else if (res[i].hasOwnProperty('similarTo')) {
            $scope.synonymsarray = $scope.synonymsarray.concat(res[i].similarTo);
            $scope.synonymdefination = $scope.synonymdefination + res[i].definition + '<br/>'
          }
        }
        $scope.details.synonymTitle = $scope.details.word + ' has ' + $scope.synonymsarray.length + ' synonyms';

      } else {
        $scope.details.synonymTitle = 'No synonyms found';
      }
    }, function (error) {
      console.error(error);
      $scope.synonymdefination = '';
      $scope.synonymsarray = [];
      $scope.details.synonymTitle = 'Please enter a word to search for synonyms';
      $ionicLoading.hide();
    });
  };
  $scope.showsynonyms = function (word) {
    $scope.details.word = word;
    $scope.linkClicked();
  };
})
.filter('unsafe', function ($sce) {
    return function (val) {
       console.warn(val);
        return $sce.trustAsHtml(val);
    };
})
