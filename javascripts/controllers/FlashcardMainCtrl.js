"use strict";

app.controller("FlashcardMainCtrl", function($scope, $rootScope, $location, FlashcardFactory){

$('.carousel.carousel-slider').carousel({full_width: true});

$scope.spellingCards = [];


	let getSpellingCards = function(){
		FlashcardFactory.getSpellingList($rootScope.user.uid).then(function(fbPins){
			$scope.spellingCards = fbPins;
			console.log("spellingCards", $scope.spellingCards);	
		});
	};

	getSpellingCards();

	// $scope.deleteBook = function(bookId){
	// 	console.log("bookId", bookId);
	// 	ReadingFactory.deleteBook(bookId).then(function(response){
	// 	getReadingList();
	// 	 });
	// };

});