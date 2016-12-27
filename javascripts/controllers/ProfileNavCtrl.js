"use strict";

app.controller("ProfileNavCtrl", function($scope, $rootScope){

	let childId = $rootScope.profileID;
	
	$scope.profileNavItems = [
	{
		name:"Dashboard", 
		url:"#/profile/dashboard/"+childId
	},
	{
		name:"Homework", 
		url:"#/homework/list/"+childId
	},
	{
		name:"Reading Log", 
		url:"#/reading/"+childId
	},
	{
		name:"Practice", 
		url:"#/flashcard/main/"+childId
	},
	{
		name:"Reward Points", 
		url:"#/reward/list/"+childId
	}
	];

});

