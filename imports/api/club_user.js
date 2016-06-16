import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'club_user.insert': function(clubUser) {
		return ClubUser.insert({
			createdAt: new Date(),
			...clubUser
		});
	},
	'club_user.remove': function({clubId, userId}) {
		ClubUser.remove({clubId, userId});
	}
});


export const ClubUser = new Mongo.Collection('club_user');
