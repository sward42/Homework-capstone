"use strict";

app.controller("CardsSpellingCtrl", function($scope, $rootScope, $location, FlashcardFactory){
	$scope.spellingCards = [];


	let getSpellingCards = function(){
		FlashcardFactory.getSpellingList($rootScope.user.uid).then(function(fbPins){
			$scope.spellingCards = fbPins;
			console.log("spellingCards", $scope.spellingCards);	
		});
	};

	getSpellingCards();

	$scope.speakWord = function(inputWord){
		responsiveVoice.speak(inputWord, "US English Female");
	};

	$scope.checkAnswer = function(correctAnswer, inputResponse){
		if (correctAnswer === inputResponse) {
			Materialize.toast('Correct! You spelled the word "' +inputResponse +'"', 3000);
			responsiveVoice.speak('Correct! You spelled the word "' +inputResponse +'"', "US English Female");
			
		} else {
			Materialize.toast('Incorrect.  Try Again!', 3000);
			responsiveVoice.speak('Incorrect.  Try Again!', "US English Female");
		};
	};

	$scope.deleteSpellingCard = function(spellingId){
		console.log("spellingId", spellingId);
		FlashcardFactory.deleteSpellingWord(spellingId).then(function(response){
		getSpellingCards();
		 });
	};

	$scope.newSpellingCard = {};

	$scope.addNewSpellingCard = function(){
		console.log("profileID", $rootScope.profileID);
		$scope.newSpellingCard.profileId = $rootScope.profileID;
		$scope.newSpellingCard.uid = $rootScope.user.uid;
		FlashcardFactory.postNewSpellingWord($scope.newSpellingCard).then(function(cardId){
			
			$scope.newReward = {};
			$scope.newSpellingCard.spellingName = null;
			getSpellingCards();
		});
	};
});