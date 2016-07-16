import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'activity_user.insert': function({activityId, userId}) {
		const data = {
			createdAt: new Date(),
			activityId,
			userId
		};
		ActivityUser.schema.validate(data);
		return ActivityUser.insert(data);
	},
	'activity_user.remove': function({activityId, userId}) {
		ActivityUser.remove({activityId, userId});
	}
});

export const ActivityUser = new Mongo.Collection('activity_user');

ActivityUser.schema = new SimpleSchema({
	activityId: {type: String},
	userId: {type: String},
	createdAt: {type: Date}
});
