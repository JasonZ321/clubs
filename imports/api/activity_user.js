import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'activity_user.insert': function({activityId, userId}) {
		return ActivityUser.insert({
			createdAt: new Date(),
			activityId,
			userId
		});
	},
	'activity_user.remove': function({activityId, userId}) {
		ActivityUser.remove({activityId, userId});
	}
});

export const ActivityUser = new Mongo.Collection('activity_user');
