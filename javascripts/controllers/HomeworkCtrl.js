"use strict";

app.controller("HomeworkCtrl", function($scope, $rootScope, $routeParams, HomeworkFactory){

	$scope.homeworkItems = [];

	// $scope.profileID = $routeParams.id;

	let getHomework = function(){
		HomeworkFactory.getHomeworkList($rootScope.user.uid).then(function(fbPins){
			$scope.homeworkItems = fbPins;
			console.log("homeworkItems", $scope.homeworkItems);	
		});
	};

	getHomework();

	$scope.deleteHomework = function(homeworkId){
		HomeworkFactory.deleteHomework(homeworkId).then(function(response){
			getHomework();
		});
	};

	$scope.selectHomework = function(homeworkId, selectedProfile){
		HomeworkFactory.getSingleHomework(homeworkId).then(function(oneHomework){
		oneHomework.id = homeworkId;
		$scope.selectedHomework = oneHomework;

		//$scope.saveEditedPin(selectedBoard, $scope.selectedPin);
		});
	};


	// $scope.editedPin = {};
	// $scope.saveEditedPin = (selectedBoard, selectedPin)=>{
	// 	$scope.editedPin.pinTitle = selectedPin.pinTitle;
	// 	$scope.editedPin.boardid = selectedBoard;
	// 	$scope.editedPin.url = selectedPin.url;
	// 	$scope.editedPin.uid = $rootScope.user.uid;
	// 	$scope.editedPin.id = selectedPin.id;
	// 	PinFactory.editPin($scope.editedPin).then((editResponse)=>{
	// 		$scope.editedPin = {};
	// 		$scope.selectedPin = {};
	// 		getPins();
	// 	});
	// };

});