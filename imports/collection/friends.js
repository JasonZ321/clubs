import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'friends.add': function({self, friend}){
		const myself = Friends.findOne({self});
		if (myself) {
			Friends.update({self},  { $addToSet : { "friends" :  friend}});
		} else {
			const data = {createdAt: new Date(), self};
			Friends.schema.validate(data);
			Friends.insert(data, function(error, result) {
				if (error) {
					console.log("error", error);
				} else {
					Friends.update({_id: result},  { $addToSet : { "friends" :  friend}});
				}
			});
		}
	},
	'friends.remove': function({self, friend}) {
		Friends.update({self}, {$pull: { friends: friend}});
	}
});

export const Friends = new Mongo.Collection('friends');

Friends.schema = new SimpleSchema({
	createdAt: {type: Date},
	self: {type: String},
	friends: {type: [String], optional: true}
});
