"use strict";

app.controller("HomeworkCtrl", function($scope, $location, $rootScope, $routeParams, HomeworkFactory, ProfileFactory){

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

	$scope.inputChange = function(thingy){
		HomeworkFactory.editHomework(thingy).then(function(response){
			console.log("ctrl inputChange response", response);
		});
	};

	$scope.toSingleView = function(homeworkId){
		$location.url("/homework/view/homeworkId"); 
	};


	$scope.pointsProfile = {};
	$scope.selectProfile = function(currentProfileId, anyProfile){
		ProfileFactory.getSingleProfile(currentProfileId).then(function(currentProfile){
			currentProfile.id = currentProfileId;
			$scope.pointsProfile = currentProfile;
			$scope.pointsProfile.rewardPoints += 5;
			console.log("pointsProfile", $scope.pointsProfile);

			$scope.addPoints($scope.pointsProfile);
		});
	};

	$scope.addPoints = function(anyProfile){
		ProfileFactory.addRewardPoints(anyProfile).then(function(response){
			console.log("points response", response);
			Materialize.toast("You've Earned 5 Reward Points!", 3000);
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