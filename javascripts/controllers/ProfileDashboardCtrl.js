"use strict";

app.controller("ProfileDashboardCtrl", function($scope, $rootScope, $routeParams, HomeworkFactory){

	$scope.homeworkItems = [];
	
	$rootScope.profileID = $routeParams.id;

	let getHomework = function(){
		HomeworkFactory.getHomeworkList($rootScope.user.uid).then(function(fbPins){
			$scope.homeworkItems = fbPins;
			console.log("homeworkItems", $scope.homeworkItems);	
		});
	};

	getHomework();

});