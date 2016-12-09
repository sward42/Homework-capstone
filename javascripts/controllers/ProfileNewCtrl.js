"use strict";

app.controller("ProfileNewCtrl", function($scope, $rootScope, $location, $routeParams, ProfileFactory) {
  $scope.newProfile = {};
  console.log("ProfileNewCtrl");

  $scope.createNewProfileThenReloadProfiles = function(newProfileName) {
    console.log("createNewProfileThenReloadProfiles");
    $scope.newProfile.profileName = $scope.newProfileName;
    $scope.newProfile.uid = $rootScope.user.uid;
    ProfileFactory.postNewProfile($scope.newProfile).then(function(itemId) {
      $location.url("/profiles/list");
      $scope.newProfile = {};
    });
  };

});

