import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'comments.insert': function({activityId, content}){
		 const data = {
			 createdAt: new Date(),
			 userId: this.userId,
			 activityId,
			 content
		 };
		 Comments.schema.validate(data);
		 return Comments.insert();
	},
	'comments.remove': function(commentId) {
		Comments.remove({'_id' : commentId});
	}
});

export const Comments = new Mongo.Collection('comments');

Comments.schema = new SimpleSchema({
	createdAt: {type: Date},
	activityId: {type: String},
	content: {type: String},
	userId: {type: String}
});
