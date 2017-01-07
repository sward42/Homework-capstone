"use strict";

app.controller("CardsVocabCtrl", function ($scope, $rootScope, $location, FlashcardFactory) {

	$scope.vocabCards = [];


	let getVocabCards = function(){
		FlashcardFactory.getVocabList($rootScope.user.uid).then(function(fbPins){
			$scope.vocabCards = fbPins;
			console.log("vocabCards", $scope.vocabCards);	
		});
	};

	getVocabCards();

	$scope.speakWord = function(inputWord){
		responsiveVoice.speak(inputWord, "US English Female");
	};

	$scope.deleteVocabCard = function(vocabId){
		console.log("vocabId", vocabId);
		FlashcardFactory.deleteVocabWord(vocabId).then(function(response){
		getVocabCards();
		 });
	};

	$scope.newVocabCard = {};

	$scope.addNewVocabCard = function(){
		console.log("profileID", $rootScope.profileID);
		$scope.newVocabCard.profileId = $rootScope.profileID;
		$scope.newVocabCard.uid = $rootScope.user.uid;
		FlashcardFactory.postNewVocabWord($scope.newVocabCard).then(function(cardId){
			
			$scope.newReward = {};
			$scope.newVocabCard.vocabName = null;
			$scope.newVocabCard.vocabDefinition = null;
			getVocabCards();
		});
	};

	$scope.getWordDefinition = function(vocabWord){
		FlashcardFactory.getDefinition(vocabWord).then(function(response){
			console.log("response", response);
		});
	};

});