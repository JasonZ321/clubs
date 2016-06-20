import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'comments.insert': function(activityId, content){
		 return Comments.insert({
			 createdAt: new Date(),
			 userId: this.userId,
			 activityId,
			 content
		 });
	},
	'comments.remove': function(commentId) {
		Comments.remove({'_id' : commentId});
	}
});

export const Comments = new Mongo.Collection('comments');
