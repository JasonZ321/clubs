import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'clubs.insert': function(club) {
		return Clubs.insert({
			createdAt: new Date(),
			owner: this.userId,
			...club
		});
	}
});


export const Clubs = new Mongo.Collection('clubs');
