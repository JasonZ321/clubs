import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'activity_image.insert':function({activityId, imageId}){
		return ActivityImage.insert({
			createdAt: new Date(),
			activityId,
			imageId
		});
	},
	'activity_image.remove':function({activityId, imageId}) {
		ActivityImage.remove({activity, imageId});
	}
});


export const ActivityImage = new Mongo.Collection("activity_image");
