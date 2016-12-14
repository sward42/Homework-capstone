"use strict";

app.controller("ReadingCtrl", function($scope, $rootScope, $location, ReadingFactory, ProfileFactory){

$scope.readBooks = [];


	let getReadingList = function(){
		ReadingFactory.getReadingLog($rootScope.user.uid).then(function(fbPins){
			$scope.readBooks = fbPins;
			console.log("readBooks", $scope.readBooks);	
		});
	};

	getReadingList();

	$scope.deleteBook = function(bookId){
		console.log("bookId", bookId);
		ReadingFactory.deleteBook(bookId).then(function(response){
		getReadingList();
		 });
	};
	
	$scope.pointsProfile = {};
	$scope.selectProfile = function(currentProfileId, anyProfile){
		ProfileFactory.getSingleProfile(currentProfileId).then(function(currentProfile){
			currentProfile.id = currentProfileId;
			$scope.pointsProfile = currentProfile;
			$scope.pointsProfile.rewardPoints += 5;
			console.log("pointsProfile", $scope.pointsProfile);

			$scope.addPoints($scope.pointsProfile);
		});
	};

	$scope.addPoints = function(anyProfile){
		ProfileFactory.addRewardPoints(anyProfile).then(function(response){
			console.log("points response", response);
		});
	};

});