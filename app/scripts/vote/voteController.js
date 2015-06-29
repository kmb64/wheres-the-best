/*global Firebase */

'use strict';

/**
 * @ngdoc function
 * @name bestInMelbourneApp.controller:VoteCtrl
 * @description
 * # VoteCtrl
 * Controller of the bestInMelbourneApp
 */
angular.module('bestInMelbourneApp')
  .controller('VoteCtrl', ['$scope', '$firebaseObject', 'config', '$routeParams', 'Social', 'Auth', 'userAccount', 'vote',
    function ($scope, $firebaseObject, config, $routeParams, Social, Auth, userAccount, vote) {

      var ref = new Firebase(config.firebase + $routeParams.city + '/' + $routeParams.type + '/' + $routeParams.place);
      var place = $firebaseObject(ref);

      $scope.$parent.placeType = $routeParams.type;
      var auth = Auth.getAuth();

      place.$loaded(function(){
        place.$bindTo($scope, 'place');

        if(typeof place.social.instagram !== 'undefined') {
          Social.getRecentMedia(place.social.instagram).then(function(response){
            $scope.media = response;
          });
        }

        Social.assignProfilePicture(place.social).then(function (response) {
          $scope.place.profilePicture = response;
        });

        userAccount.getAccount('1234').then(function(response){
          console.log('get account loaded');
          console.log(response);
          $scope.voted = vote.hasUserVoted(response, $routeParams.city, $routeParams.type,$routeParams.place)
        });

      });

      auth.$onAuth(function (authData) {
        console.log(authData);
        $scope.authorized = authData;
      });

      $scope.getAuthorized = function (provider) {
        auth.$authWithOAuthRedirect(provider, function (error) {
          $scope.status = 'fail redirect' + error;
        });
      };

      $scope.logOut = function () {
        auth.$unauth();
      };

    }]);
