"use strict";
let isAuth = (AuthFactory)=>{
	new Promise( (resolve, reject)=>{
		if (AuthFactory.isAuthenticated()){
			resolve();
		} else {
			reject();
		}
	});
};
app.run(function($rootScope, $location, AuthFactory, FIREBASE_CONFIG){
	firebase.initializeApp(FIREBASE_CONFIG);
	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
		let logged = AuthFactory.isAuthenticated();
		let appTo;
		if (currRoute.originalPath){
			appTo = currRoute.originalPath.indexOf('/auth') !== -1;
		}
		console.log("appTo", appTo);
		if(!appTo && !logged){
			event.preventDefault();
			$location.path('/auth');
		}
	});
});

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.when('/auth', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.when('/profiles/list', {
			templateUrl: 'partials/profiles-list.html',
			controller: 'ProfileListCtrl',
			resolve: {isAuth}
		})
		.when('/profile/new', {
			templateUrl: 'partials/profile-new.html',
			controller: 'ProfileNewCtrl',
			resolve: {isAuth}
		})
		// .when('/boards/edit/:id', {
		// 	templateUrl: 'partials/board-edit.html',
		// 	controller: 'BoardEditCtrl',
		// 	resolve: {isAuth}
		// })
		.when('/profile/dashboard/:id', {
			templateUrl: 'partials/profile-dashboard.html',
			controller: 'ProfileDashboardCtrl',
			resolve: {isAuth}
		})
		.when('/homework/list/:id', {
			templateUrl: 'partials/homework.html',
			controller: 'HomeworkCtrl',
			resolve: {isAuth}
		})
		.when('/homework/new/', {
			templateUrl: 'partials/homework-new.html',
			controller: 'HomeworkNewCtrl',
			resolve: {isAuth}
		})
		.when('/homework/view/:id', {
			templateUrl: 'partials/homework-view.html',
			controller: 'HomeworkViewCtrl',
			resolve: {isAuth}
		})
		.when('/homework/edit/:id', {
			templateUrl: 'partials/homework-edit.html',
			controller: 'HomeworkEditCtrl',
			resolve: {isAuth}
		})
		.when('/reading/:id', {
			templateUrl: 'partials/reading.html',
			controller: 'ReadingCtrl',
			resolve: {isAuth}
		})
		.when('/new_reading/', {
			templateUrl: 'partials/reading-new.html',
			controller: 'ReadingNewCtrl',
			resolve: {isAuth}
		})
		.when('/reward/list/:id', {
			templateUrl: 'partials/reward-list.html',
			controller: 'RewardListCtrl',
			resolve: {isAuth}
		})
		.when('/reward/new/', {
			templateUrl: 'partials/reward-new.html',
			controller: 'RewardNewCtrl',
			resolve: {isAuth}
		})
		.when('/flashcard/main/:id', {
			templateUrl: 'partials/flashcard-main.html',
			controller: 'FlashcardMainCtrl',
			resolve: {isAuth}
		})
		.when('/logout', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
	 	.otherwise('/auth');
});
