import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'clubs.insert': function(club) {
		return Clubs.insert({
			createdAt: new Date(),
			owner: this.userId,
			...club
		});
	},
	'clubs.remove': function(club) {
		if (club.owner === this.userId) {
			Clubs.remove(club);
		} else {
			console.error('User has no permission to remove club {}', club.name);
		}
	},
	'clubs.update': function(clubId, club) {
		if (clubId && club) {
			Clubs.update(clubId, {
	      $set: { ...club },
	    });
		}
	}
});


export const Clubs = new Mongo.Collection('clubs');
