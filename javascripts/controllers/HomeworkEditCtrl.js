"use strict";

app.controller("HomeworkEditCtrl", function($scope, $routeParams, $rootScope, $location, HomeworkFactory){
	$scope.editedHomework = {};
	let homeworkId = $routeParams.id;

	HomeworkFactory.getSingleHomework(homeworkId).then(function(oneHomework){
		oneHomework.id = homeworkId;
		$scope.editedHomework = oneHomework;
	});

	$scope.addEditedHomework = function(){
		console.log("profileID", $rootScope.profileID);
		$scope.editedHomework.isCompleted = false;
		$scope.editedHomework.profileId = $rootScope.profileID;
		$scope.editedHomework.uid = $rootScope.user.uid;
		HomeworkFactory.editHomework($scope.editedHomework).then(function(response){
			$scope.editedHomework = {};
			$location.url("/homework/list/$rootScope.profileID");
		});
	};
});