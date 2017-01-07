"use strict";

app.controller("FlashcardMainCtrl", function($scope, $rootScope, $location, FlashcardFactory){

	$scope.showSpellingCards = function(){
		$location.url("/cards/spelling/"+$rootScope.profileID);
	};

	$scope.showSightCards = function(){
		$location.url("/cards/sight/"+$rootScope.profileID);
	};

	$scope.showVocabCards = function(){
		$location.url("/cards/vocab/"+$rootScope.profileID);
	};

});