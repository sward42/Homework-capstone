"use strict";

app.factory("FlashcardFactory", function($http, $q, FIREBASE_CONFIG, DICTIONARY_CONFIG){

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


	var getSightList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/sightWords.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let sightWords = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		sightWords.push(response[key]);
			 	});
			 	resolve(sightWords);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	
	//Firebase: send a new sight word to Firebase
	var postNewSightWord = function(newSightWord){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/sightWords.json`, JSON.stringify({
				sightName: newSightWord.sightName,
				profileId: newSightWord.profileId,
				uid: newSightWord.uid
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

	var deleteSightWord = function(sightWordId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/sightWords/${sightWordId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};

	var getVocabList = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/vocabWords.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let vocabWords = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		vocabWords.push(response[key]);
			 	});
			 	resolve(vocabWords);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	
	//Firebase: send a new sight word to Firebase
	var postNewVocabWord = function(newVocabWord){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/vocabWords.json`, JSON.stringify({
				vocabName: newVocabWord.vocabName,
				vocabDefinition: newVocabWord.vocabDefinition,
				profileId: newVocabWord.profileId,
				uid: newVocabWord.uid
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

	var deleteVocabWord = function(vocabWordId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/vocabWords/${vocabWordId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};

	var getDefinition = function(vocabWord){
		return $q((resolve, reject)=>{
			$http.get(`${DICTIONARY_CONFIG.dictionaryURL}/${vocabWord}?key=${DICTIONARY_CONFIG.apiKey}`)
			.success( (response)=>{
				console.log("response", response);
			 	resolve(response);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};


	return {getSpellingList:getSpellingList, postNewSpellingWord:postNewSpellingWord, deleteSpellingWord:deleteSpellingWord, 
			getSightList:getSightList, postNewSightWord:postNewSightWord, deleteSightWord:deleteSightWord, 
			getVocabList:getVocabList, postNewVocabWord:postNewVocabWord, deleteVocabWord:deleteVocabWord,
			getDefinition:getDefinition};
});