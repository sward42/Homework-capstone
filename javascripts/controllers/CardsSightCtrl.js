"use strict";

app.controller("CardsSightCtrl", function ($scope, $rootScope, $location, FlashcardFactory) {

	$scope.sightCards = [];

	let getSightCards = function(){
		console.log("$rootScope.user.uid", $rootScope.user.uid);
		FlashcardFactory.getSightList($rootScope.user.uid).then(function(fbPins){
			$scope.sightCards = fbPins;
			console.log("sightCards", $scope.sightCards);	
		});
	};

	getSightCards();

	$scope.speakWord = function(inputWord){
		responsiveVoice.speak(inputWord, "US English Female");
	};

	$scope.deleteSightCard = function(sightId){
		console.log("sightId", sightId);
		FlashcardFactory.deleteSightWord(sightId).then(function(response){
		getSightCards();
		 });
	};

	$scope.newSightCard = {};

	$scope.addNewSightCard = function(){
		console.log("profileID", $rootScope.profileID);
		$scope.newSightCard.profileId = $rootScope.profileID;
		$scope.newSightCard.uid = $rootScope.user.uid;
		FlashcardFactory.postNewSightWord($scope.newSightCard).then(function(cardId){
			
			$scope.newReward = {};
			$scope.newSightCard.sightName = null;
			getSightCards();
		});
	};

});