"use strict";

app.factory("FlashcardFactory", function($http, $q, FIREBASE_CONFIG){

	var getSpellingList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/spellingWords.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let spellingWords = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		spellingWords.push(response[key]);
			 	});
			 	resolve(spellingWords);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	
	//Firebase: send a new item to Firebase
	var postNewSpellingWord = function(newSpellingWord){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/spellingWords.json`, JSON.stringify({
				spellingName: newSpellingWord.spellingName,
				profileId: newSpellingWord.profileId,
				uid: newSpellingWord.uid
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

	var deleteSpellingWord = function(spellingWordId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/spellingWords/${spellingWordId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};

	return {getSpellingList:getSpellingList, postNewSpellingWord:postNewSpellingWord, deleteSpellingWord:deleteSpellingWord};
});