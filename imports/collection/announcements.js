import {Mongo} from 'meteor/mongo';

Meteor.methods({
	'announcements.insert':function(announcement){
		Announcements.insert({
			...announcement,
			createdAt: new Date()
		});
	},
	'announcements.remove':function({title, clubId}){
		Announcements.remove({title, clubId});
	}
});

export const Announcements = new Mongo.Collection('announcements');
