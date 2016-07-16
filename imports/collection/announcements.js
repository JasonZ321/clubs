import {Mongo} from 'meteor/mongo';

Meteor.methods({
	'announcements.insert':function(announcement){
		const data = {
			...announcement,
			createdAt: new Date()
		};
		Announcements.schema.validate(data);
		Announcements.insert(data);
	},
	'announcements.remove':function({title, clubId}){
		Announcements.remove({title, clubId});
	}
});

export const Announcements = new Mongo.Collection('announcements');

Announcements.schema = new SimpleSchema({
	createdAt: {type: Date},
	title: {type: String, max: 50},
	content: {type: String},
	clubId: {type: String}
});
