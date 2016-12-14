"use strict";

app.controller("RewardNewCtrl", function($scope, $rootScope, $location, ProfileFactory, RewardFactory){

	$scope.newReward = {};

	$scope.addNewReward = function(){
		console.log("profileID", $rootScope.profileID);
		$scope.newReward.profileId = $rootScope.profileID;
		$scope.newReward.uid = $rootScope.user.uid;
		RewardFactory.postNewReward($scope.newReward).then(function(rewardId){
			
			$location.url("/reward/list/"+$rootScope.profileID);
			$scope.newReward = {};
		});
	};

});