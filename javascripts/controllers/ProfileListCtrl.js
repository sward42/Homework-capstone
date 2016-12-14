"use strict";

app.controller("ProfileListCtrl", function($scope, $rootScope, $location, ProfileFactory){

	$scope.profiles = [];
	$scope.profleToEdit = {};
	$rootScope.profileID = null;

	ProfileFactory.getProfileList($rootScope.user.uid).then(function(profiles) {
    $scope.profiles = profiles;
    $rootScope.profilesArray = profiles;
  	});

  	$scope.showCreateNewProfile = function() {
    $location.url("/profile/new");
  	};

	$scope.deleteProfile = function(profileId) {
		ProfileFactory.deleteProfile(profileId).then(function(response) {
		  ProfileFactory.getProfileList($rootScope.user.uid).then(function(profiles) {
		    $scope.profiles = profiles;
		    $rootScope.profilesArray = profiles;
		  	});
		});
	};
});