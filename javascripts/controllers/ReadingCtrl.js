"use strict";

app.controller("ReadingCtrl", function($scope, $rootScope, $location, ReadingFactory){

$scope.readBooks = [];

	// $scope.profileID = $routeParams.id;

	let getReadingList = function(){
		ReadingFactory.getReadingLog($rootScope.user.uid).then(function(fbPins){
			$scope.readBooks = fbPins;
			console.log("readBooks", $scope.readBooks);	
		});
	};

	getReadingList();

	$scope.deleteBook = function(bookId){
		ReadingFactory.deleteBook(bookId).then(function(response){
			getReadingList();
		});
	};


});