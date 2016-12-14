"use strict";

app.factory("RewardFactory", function($http, $q, FIREBASE_CONFIG){

	var getRewardList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/rewards.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let rewards = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		rewards.push(response[key]);
			 	});
			 	resolve(rewards);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	
	//Firebase: send a new item to Firebase
	var postNewReward = function(newReward){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/rewards.json`, JSON.stringify({
				rewardTitle: newReward.rewardTitle,
				description: newReward.description,
				pointsNeeded: newReward.pointsNeeded,
				profileId: newReward.profileId,
				uid: newReward.uid
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

	var deleteReward = function(rewardId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/rewards/${rewardId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};
	var getSingleReward = function(rewardId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/rewards/${rewardId}.json`)
			 .success( (getSingleReponse)=>{
			 	resolve(getSingleReponse);
			 })
			 .error( (getSingleError)=>{
			 	reject(getSingleError);
			 });
		});
	};
	var subtractRewardPoints = function(pointsProfile){
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

	return {getRewardList:getRewardList, postNewReward:postNewReward, deleteReward:deleteReward, getSingleReward:getSingleReward, subtractRewardPoints:subtractRewardPoints};	

});