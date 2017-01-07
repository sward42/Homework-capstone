"use strict";

app.controller("ReadingNewCtrl", function($scope, $rootScope, $location, ReadingFactory, ProfileFactory){

	$scope.newBook = {};

	$scope.pointsProfile = {};
	$scope.selectProfile = function(currentProfileId, anyProfile){
		ProfileFactory.getSingleProfile(currentProfileId).then(function(currentProfile){
			currentProfile.id = currentProfileId;
			$scope.pointsProfile = currentProfile;
			$scope.pointsProfile.rewardPoints += 10;
			console.log("pointsProfile", $scope.pointsProfile);

			$scope.addPoints($scope.pointsProfile);
		});
	};

	$scope.addPoints = function(anyProfile){
		ProfileFactory.addRewardPoints(anyProfile).then(function(response){
			console.log("points response", response);
			Materialize.toast("You've earned 10 Reward Points!", 3000);
		});
	};


	$scope.addNewBook = function(){
		console.log("profileID", $rootScope.profileID);
		$scope.newBook.profileId = $rootScope.profileID;
		$scope.newBook.uid = $rootScope.user.uid;
		ReadingFactory.postNewBook($scope.newBook).then(function(bookId){
			
			$location.url("/reading/"+$rootScope.profileID);
			$scope.newBook = {};
		});
	};

});