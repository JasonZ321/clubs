import { Meteor } from 'meteor/meteor';
import { Announcements } from '../collection/announcements';
import { Articles } from '../collection/articles';

export function createArticle(article, callback) {
	Meteor.call("articles.insert", article, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(callback){
			callback(result);
		}
	});
}

export function createAnnouncement(announcement, callback) {
	Meteor.call("announcements.insert", announcement, function(error, result){
		if(error){
			console.log("error", error);
		}
		if (callback) {
			callback(result);
		}
	});
}
