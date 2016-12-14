"use strict";

app.controller("RewardListCtrl", function ($scope, $location, $rootScope, ProfileFactory, RewardFactory) {
	
	$scope.rewardItems = {};

	let profileUpdate = function(){
		ProfileFactory.getProfileList($rootScope.user.uid).then(function(profiles) {
		    $scope.profiles = profiles;
		    $rootScope.profilesArray = profiles;
	  	});
	};

	profileUpdate();

	let getRewards = function(){
		RewardFactory.getRewardList($rootScope.user.uid).then(function(fbPins){
			$scope.rewardItems = fbPins;
			console.log("rewardItems", $scope.rewardItems);	
		});
	};

	getRewards();

	$scope.deleteRewardItem = function(rewardId){
		console.log("rewardId", rewardId);
		RewardFactory.deleteReward(rewardId).then(function(response){
		getRewards();
		 });
	};

	$scope.pointsProfile = {};
	$scope.selectProfile = function(currentProfileId, minusRewardPoints){
		ProfileFactory.getSingleProfile(currentProfileId).then(function(currentProfile){
			currentProfile.id = currentProfileId;
			$scope.pointsProfile = currentProfile;
			$scope.pointsProfile.rewardPoints -= minusRewardPoints;
			console.log("pointsProfile", $scope.pointsProfile);

			$scope.subtractPoints($scope.pointsProfile);
		});
	};

	$scope.subtractPoints = function(anyProfile){
		RewardFactory.subtractRewardPoints(anyProfile).then(function(response){
			console.log("points response", response);
			profileUpdate();
		});

	};



});