import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'activity_user.insert': function(activityUser) {
		return ActivityUser.insert({
			createdAt: new Date(),
			...activityUser
		});
	},
	'activity_user.remove': function({activityId, userId}) {
		ActivityUser.remove({activityId, userId});
	}
});


export const ActivityUser = new Mongo.Collection('activity_user');
