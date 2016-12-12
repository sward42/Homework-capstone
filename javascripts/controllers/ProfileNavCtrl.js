"use strict";

app.controller("ProfileNavCtrl", function($scope, $rootScope){

	$scope.profileNavItems = [
	{
		name:"Dashboard", 
		url:"#/profile/dashboard/$rootScope.profileID"
	},
	{
		name:"Homework", 
		url:"#/homework/list/$rootScope.profileID"
	},
	{
		name:"Reading Log", 
		url:"#/reading/$rootScope.profileID"
	},
	{
		name:"Flashcards", 
		url:"#/flashcards/$rootScope.profileID"
	},
	{
		name:"Reward Points", 
		url:"#/rewards/$rootScope.profileID"
	}
	];
});

