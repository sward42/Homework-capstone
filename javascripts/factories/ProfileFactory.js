"use strict";

app.factory("ProfileFactory", function($q, $http, FIREBASE_CONFIG){
	var getProfileList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/profiles.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let profiles = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		profiles.push(response[key]);
			 	});
			 	resolve(profiles);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	
	//Firebase: send a new item to Firebase
	var postNewProfile = function(newProfile){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/profiles.json`, JSON.stringify({
				profileName: newProfile.profileName,
				profileImage: newProfile.profileImage,
				grade: newProfile.grade,
				rewardPoints: newProfile.rewardPoints,
				uid: newProfile.uid
				})
			)
			 .success( (postResponse)=>{
			 	resolve(postResponse);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};

	var deleteProfile = function(profileId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/profiles/${profileId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};
	var getSingleProfile = function(profileId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/profiles/${profileId}.json`)
			 .success( (getSingleReponse)=>{
			 	resolve(getSingleReponse);
			 })
			 .error( (getSingleError)=>{
			 	reject(getSingleError);
			 });
		});
	};
	var addRewardPoints = function(pointsProfile){
		return $q((resolve, reject)=>{
			$http.patch(`${FIREBASE_CONFIG.databaseURL}/profiles/${pointsProfile.id}.json`, 
				JSON.stringify({
					
					rewardPoints: pointsProfile.rewardPoints,
					
				})
			)
			 .success( (editResponse)=>{
			 	resolve(editResponse);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};

	var editProfile = function(editProfile){
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/profiles/${editProfile.id}.json`, 
				JSON.stringify({
					profileName: editProfile.profileName,
					profileImage: editProfile.profileImage,
					grade: editProfile.grade,
					rewardPoints: editProfile.rewardPoints,
					uid: editProfile.uid
				})
			)
			 .success( (editResponse)=>{
			 	resolve(editResponse);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	return {getProfileList:getProfileList, postNewProfile:postNewProfile, deleteProfile:deleteProfile, getSingleProfile:getSingleProfile, editProfile: editProfile, addRewardPoints:addRewardPoints};	
});