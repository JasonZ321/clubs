import { Meteor } from 'meteor/meteor';
import { Images } from '../collection/image';
import { userJoinClub } from './club_api';
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

export function userJoinActivity(activityId, clubId, callback) {
	const userId = Meteor.userId();
	debugger;
	Meteor.call("activity_user.insert", {activityId, userId}, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(result){
			console.log("User '%s' joined Activity '%s' ", userId, activityId);
			userJoinClub(clubId);
		}
		if(callback) {
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

export function createActivityImage(file, activityId, callback) {
	Images.insert(file, function(err, fileObj){
		if (err) {
			console.log(err);
		} else {
			setTimeout(function () {
				// TODO: image still not uploaded at this point for some reason.
				// work around set time out
				Meteor.call("activity_image.insert", {activityId, imageId:fileObj._id}, function (error, result) {
					if (error) {
						console.log("error", error);
					}
					if (result) {
						console.log("Image %s added on activity %s", fileObj._id, activityId);
					}
					if (callback) {
						callback(result);
					}
				});
			}, 1000);
		}
	});
}

export function removeActivityImage(imageId, activityId, callback) {
  Images.remove({'_id': imageId});
	Meteor.call("activity_image.remove", {activityId, imageId}, function (error, result) {
		if (error) {
			console.log("error", error);
		}
		if (result) {
			console.log("Image %s removed on activity %s", imageId, activityId);
		}
		if (callback) {
			callback(result);
		}
	});
}

export function submitComment(activityId, content, callback) {
	Meteor.call('comments.insert', {activityId, content}, function(error, result) {
		if (error) {
			console.log("error", error);
		}
		if (result) {
			console.log("Comment '%s' added ", content);
		}
		if (callback) {
			callback(result);
		}
	});
}
