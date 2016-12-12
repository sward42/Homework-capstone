"use strict";

app.controller("ReadingNewCtrl", function($scope, $rootScope, $location, ReadingFactory){

	$scope.newBook = {};

	$scope.addNewBook = function(){
		console.log("profileID", $rootScope.profileID);
		$scope.newHomework.profileId = $rootScope.profileID;
		$scope.newHomework.uid = $rootScope.user.uid;
		ReadingFactory.postNewBook($scope.newBook).then(function(bookId){
			$location.url("/reading/$rootScope.profileID");
			$scope.newBook = {};
		});
	};

});