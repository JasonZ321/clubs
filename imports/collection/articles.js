import {Mongo} from 'meteor/mongo';

Meteor.methods({
	'articles.insert':function(article){
		const data = {
			...article,
			createdAt: new Date()
		};
		Articles.schema.validate(data);
		Articles.insert(data);
	},
	'articles.remove':function({title, clubId}){
		Articles.remove({title, clubId});
	}
});

export const Articles = new Mongo.Collection('articles');
Articles.schema = new SimpleSchema({
	title: {type: String},
	content: {type: String},
	createdAt: {type: Date},
	clubId: {type: String}
});
