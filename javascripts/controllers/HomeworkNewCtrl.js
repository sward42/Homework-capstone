"use strict";

app.controller("HomeworkNewCtrl", function ($scope, $rootScope, $location, $routeParams, HomeworkFactory) {

// $scope.myDate = new Date();

//   $scope.minDate = new Date(
//       $scope.myDate.getFullYear(),
//       $scope.myDate.getMonth() - 2,
//       $scope.myDate.getDate());

//   $scope.maxDate = new Date(
//       $scope.myDate.getFullYear(),
//       $scope.myDate.getMonth() + 2,
//       $scope.myDate.getDate());



	$scope.newHomework = {};

	$scope.addNewHomework = function(){
		console.log("profileID", $rootScope.profileID);
		$scope.newHomework.isCompleted = false;
		$scope.newHomework.profileId = $rootScope.profileID;
		$scope.newHomework.uid = $rootScope.user.uid;
		HomeworkFactory.postNewHomework($scope.newHomework).then(function(homeworkId){
			$location.url("/homework/list/"+$rootScope.profileID);
			$scope.newHomework = {};
		});
	};

});