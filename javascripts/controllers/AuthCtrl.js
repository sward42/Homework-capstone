"use strict";

app.controller("AuthCtrl", function($location, $scope, $rootScope, AuthFactory, UserFactory){
	$scope.loginContainer = false;
	$scope.registerContainer = false;

	$scope.login = {
		email: "a@a.com",
		password: "123456"
	};

	if($location.path()=== "/logout"){
		AuthFactory.logout();
		$rootScope.user = {};
		$location.url("/");
	}
	$scope.setLoginContainer = function(){
		$scope.loginContainer = true;
		$scope.registerContainer = false;
	};
	$scope.setRegisterContainer = function(){
		$scope.loginContainer = false;
		$scope.registerContainer = true;
	};
	let logMeIn = (loginStuff)=>{
		AuthFactory.authenticate(loginStuff).then( (loginResponse)=>{
			console.log("loginResponse", loginResponse);
			return UserFactory.getUser(loginResponse.uid);
		}).then( (userCreds)=>{
			console.log("userCreds", userCreds);
			$rootScope.user = userCreds;
			$scope.login = {};
			$scope.register = {};
			$location.url('/profiles/list');

		});
	};
	$scope.loginGoogleUser = ()=>{
		AuthFactory.authenticateGoogle().then( (logGoogleResponse)=>{
			console.log("logGoogleResponse", logGoogleResponse);
			$rootScope.user = {
				uid: logGoogleResponse.uid,
				username: logGoogleResponse.displayName 
			};
			$scope.login = {};
			$scope.register = {};
			$location.url('/profiles/list');
		}).then( (logGoogleComplete)=>{
			console.log("logGoogleComplete", logGoogleComplete);
		});
	};
	$scope.registerUser = function(registerNewUser){
		console.log("registerNewUser", registerNewUser);
		AuthFactory.registerWithEmail(registerNewUser).then( (registerResponse)=>{
			console.log("registerResponse", registerResponse);
			registerNewUser.uid = registerResponse.uid;
			return UserFactory.addUser(registerNewUser);
		}).then( (registerComplete)=>{
			logMeIn(registerNewUser);
		});
	};
	$scope.loginUser = function(loginNewUser){
		logMeIn(loginNewUser);
	};

// 	//Drawing Setup and animation
// 	var ctx = document.querySelector("canvas").getContext("2d"),
//     dashLen = 220, dashOffset = dashLen, speed = 5,
//     txt = "HomeWork", x = 30, i = 0;

// 	ctx.font = "100px 'Fredericka the Great', cursive, sans-serif"; 
// 	ctx.lineWidth = 1; //ctx.lineJoin = "round"; ctx.globalAlpha = 2/3;
// 	ctx.strokeStyle = ctx.fillStyle = "#fafafa";

// 	(function loop() {
// 	ctx.clearRect(x, 0, 60, 150);
// 	ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
// 	dashOffset -= speed;                                         // reduce dash length
// 	ctx.strokeText(txt[i], x, 90);                               // stroke letter

// 	if (dashOffset > 0) requestAnimationFrame(loop);             // animate
// 	else {
// 	ctx.fillText(txt[i], x, 90);                               // fill final letter
// 	dashOffset = dashLen;                                      // prep next char
// 	x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
// 	ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
// 	ctx.rotate(Math.random() * 0.005);                         // random rotation
// 	if (i < txt.length) requestAnimationFrame(loop);
//   }
// })();
});
