import {Mongo} from 'meteor/mongo';

Meteor.methods({
	'articles.insert':function(article){
		Articles.insert({
			...article,
			createdAt: new Date()
		});
	},
	'articles.remove':function({title, clubId}){
		Articles.remove({title, clubId});
	}
});

export const Articles = new Mongo.Collection('articles');
