"use strict";

app.controller("ProfileDashboardCtrl", function($scope, $rootScope, $routeParams, HomeworkFactory, ProfileFactory){

	$scope.homeworkItems = [];
	
	if ($rootScope.profileID === null) {
		$rootScope.profileID = $routeParams.id;
	}

	ProfileFactory.getProfileList($rootScope.user.uid).then(function(profiles) {
    $scope.profiles = profiles;
    $rootScope.profilesArray = profiles;
  	});

	let getHomework = function(){
		HomeworkFactory.getHomeworkList($rootScope.user.uid).then(function(fbPins){
			$scope.homeworkItems = fbPins;
			console.log("homeworkItems", $scope.homeworkItems);	
		});
	};

	getHomework();

});