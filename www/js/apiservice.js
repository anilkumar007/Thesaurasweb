(function () {
  'use strict';
  angular.module('starter').service('Apiservices', ['$q', '$http', Apiservices]);
  function Apiservices ($q, $http) {
    var self = this;
    self.getsynonymsanddefination = function (word) {
      var defer = $q.defer();
      if (word) {
        if (word == window.localStorage['word']) {
          defer.resolve(JSON.parse(window.localStorage['wordresults']));
        } else {
          $http.get('http://localhost:5000/sessions/' + word).then(function (res) {
            console.info('step 1');
            // console.info(res);
            window.localStorage['word'] = word;
            window.localStorage['wordresults'] = JSON.stringify(res.data.results);
            defer.resolve(res.data.results);
          }, function (error) {
            console.error('error');
            console.error(error);
            defer.reject(error);
          });
        }
      } else {
        defer.reject('error');
      }
      return defer.promise;
    };
    return self;
  }
})();