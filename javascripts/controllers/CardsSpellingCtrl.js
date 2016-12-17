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

});