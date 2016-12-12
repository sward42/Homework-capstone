"use strict";

app.factory("ReadingFactory", function($http, $q, FIREBASE_CONFIG){

var getReadingLog = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/reading.json?orderBy="uid"&equalTo="${userId}"`)
			 .success( (response)=>{
			 	let readingLog = [];
			 	Object.keys(response).forEach((key)=>{
			 		response[key].id = key;
			 		readingLog.push(response[key]);
			 	});
			 	resolve(readingLog);
			 })
			 .error( (errorResponse)=>{
			 	reject(errorResponse);
			 });
		});
	};
	
	//Firebase: send a new item to Firebase
	var postNewBook = function(newBook){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/reading.json`, JSON.stringify({
				bookTitle: newBook.bookTitle,
				author: newBook.author,
				dateRead: newBook.dueDate,
				profileId: newBook.profileId,
				uid: newBook.uid
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

	var deleteBook = function(bookId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/reading/${bookId}.json`)
			 .success( (deleteReponse)=>{
			 	resolve(deleteReponse);
			 })
			 .error( (deleteError)=>{
			 	reject(deleteError);
			 });
		});
	};
	
	return {getReadingLog:getReadingLog, postNewBook:postNewBook, deleteBook:deleteBook};	
});

