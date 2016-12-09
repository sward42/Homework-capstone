"use strict";

app.controller("HomeworkViewCtrl", function ($scope, $routeParams, HomeworkFactory) {

	$scope.selectedHomework = {};
	let homeworkId = $routeParams.id;

	HomeworkFactory.getSingleHomework(homeworkId).then(function(oneHomework){
		oneHomework.id = homeworkId;
		$scope.selectedHomework = oneHomework;
	});


});