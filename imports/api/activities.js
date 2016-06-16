import { Mongo } from 'meteor/mongo';
import { Clubs } from './clubs';
Meteor.methods({
	'activities.insert': function(activity) {
		const clubId = Clubs.findOne({owner: this.userId})._id;
		return Activities.insert({
			createdAt: new Date(),
			owner: this.userId,
			clubId,
			...activity
		});
	},
	'activities.remove': function(activity) {
		if (activity.owner === this.userId) {
			Activities.remove(activity);
		} else {
			console.error('User has no permission to remove activity {}', activity.name);
		}
	},
	'activities.update': function(activityId, activity) {
		if (activityId && activity) {
			Activities.update(activityId, {
	      $set: { ...activity },
	    });
		}
	}
});


export const Activities = new Mongo.Collection('activities');
