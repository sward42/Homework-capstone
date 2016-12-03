
"use strict";
app.controller("NavCtrl", function($scope, $location){
	$scope.navItems = [
	{
		name:"Logout", 
		url:"#/logout"
	},
	{
		name:"All Profiles", 
		url:"#/profiles/list"
	}
];
});