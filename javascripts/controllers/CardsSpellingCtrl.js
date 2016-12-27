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
			Materialize.toast('Correct!', 3000)
			console.log("correct");
		} else {
			Materialize.toast('Incorrect. Try Again!', 3000)
			console.log("incorrect");
		};
	};

	$scope.deleteSpellingCard = function(spellingId){
		console.log("spellingId", spellingId);
		FlashcardFactory.deleteSpellingWord(spellingId).then(function(response){
		getSpellingCards();
		 });
	};
});