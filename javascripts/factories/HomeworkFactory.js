"use strict";

app.factory("HomeworkFactory", function($q, $http, FIREBASE_CONFIG){
	var getHomeworkList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/homework.json?orderBy="uid"&equalTo="${userId}"`)
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
	var postNewHomework = function(newHomework){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/homework.json`, JSON.stringify({
				homeworkTitle: newHomework.homeworkTitle,
				dueDate: newHomework.dueDate,
				profileId: newHomework.profileId,
				isCompleted: newHomework.isCompleted,
				uid: newHomework.uid
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

	var deleteHomework = function(homeworkId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/homework/${homeworkId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};
	var getSingleHomework = function(homeworkId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/homework/${homeworkId}.json`)
			 .success( (getSingleReponse)=>{
			 	resolve(getSingleReponse);
			 })
			 .error( (getSingleError)=>{
			 	reject(getSingleError);
			 });
		});
	};
	var editHomework = function(editedHomework){
		console.log("editedHomework", editedHomework);
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/homework/${editedHomework.id}.json`, 
				JSON.stringify({
					homeworkTitle: editedHomework.homeworkTitle,
					dueDate: editedHomework.dueDate,
					profileId: editedHomework.profileId,
					isCompleted: editedHomework.isCompleted,
					uid: editedHomework.uid
				})
			)
			 .success( (editResponse)=>{
			 	console.log("editResponse", editResponse);
			 	resolve(editResponse);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	return {getHomeworkList:getHomeworkList, postNewHomework:postNewHomework, deleteHomework:deleteHomework, getSingleHomework:getSingleHomework, editHomework: editHomework};	
});