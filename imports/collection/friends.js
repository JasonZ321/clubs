import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'friends.add': function({self, friend}){
		const myself = Friends.findOne({self});
		if (myself) {
			Friends.update({self},  { $addToSet : { "friends" :  friend}});
		} else {
			Friends.insert({createdAt: new Date(), self}, function(error, result) {
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
