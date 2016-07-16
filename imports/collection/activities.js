import { Mongo } from 'meteor/mongo';
import { Clubs } from './clubs';
Meteor.methods({
	'activities.insert': function(activity) {
		const clubId = Clubs.findOne({owner: this.userId})._id;
		const data = {
			createdAt: new Date(),
			owner: this.userId,
			clubId,
			...activity
		};
		Activities.schema.validate(data);
		return Activities.insert(data);
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
			Activities.schema.validate(activity);
			Activities.update(activityId, {
	      $set: { ...activity },
	    });
		}
	}
});


export const Activities = new Mongo.Collection('activities');

Activities.schema = new SimpleSchema({
	name: {type: String},
	location: {type: String},
	clubId: {type: String},
	owner: {type: String},
	start_date: {type: Date},
	end_date: {type: Date, optional: true},
	avatarURL: {type: String},
	createdAt: {type: Date}
});
