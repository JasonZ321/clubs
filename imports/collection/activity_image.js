import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'activity_image.insert':function({activityId, imageId}){
		const data = {
			createdAt: new Date(),
			activityId,
			imageId
		};
		ActivityImage.schema.validate(data);
		return ActivityImage.insert(data);
	},
	'activity_image.remove':function({activityId, imageId}) {
		return ActivityImage.remove({activityId, imageId});
	}
});


export const ActivityImage = new Mongo.Collection("activity_image");

ActivityImage.schema = new SimpleSchema({
	activityId: {type: String},
	imageId: {type: String},
	createdAt: {type: Date}
});
