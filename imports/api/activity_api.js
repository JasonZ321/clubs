import { Meteor } from 'meteor/meteor';

export function createActivity(activity, callback) {
	Meteor.call('activities.insert', activity, function(error, result) {
		if (error) {
			console.log("error", error);
		}
		if (result) {
			console.log("Activity %s created.", result.name);
		}
		// if create success callback with result as parameter, otherwise it's undefined
		if (callback) {
			callback(result);
		}
	});
}

export function updateActivity(activityId, activity, callback) {
	Meteor.call('activities.update', activityId, activity, function(error, result) {
		if (error) {
			console.log("error", error);
		}
		if (result) {
			console.log("Activity with id %s updated", activityId);
		}
		if (callback) {
			callback(result);
		}
	});
}

export function removeActivity(activity, callback) {
	Meteor.call("activities.remove", activity, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(result){
			console.log("Activity %s deleted.", result.name);
		}
		if (callback) {
			callback(result);
		}
	});
}

export function userJoinActivity(activityId, callback) {
	const userId = Meteor.userId();
	Meteor.call("activity_user.insert", {activityId, userId}, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(result){
			console.log("User '%s' joined Activity '%s' ", userId, activityId);
		}
		if (callback) {
			callback(result);
		}
	});
}

export function userQuiteActivity(activityId, callback) {
	const userId = Meteor.userId();
	Meteor.call("activity_user.remove", {activityId, userId}, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(result){
			console.log("User '%s' quited Activity '%s' ", userId, activityId);
		}
		if (callback) {
			callback(result);
		}
	});
}
