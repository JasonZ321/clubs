import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'clubs.insert': function(club) {
		const data = {
			createdAt: new Date(),
			...club
		};

		Clubs.schema.validate(data);
		return Clubs.insert(data);
	},
	'clubs.addOwner': function(clubId) {
		if (clubId) {
			Clubs.update(clubId, {
				$set: { owner: this.userId },
			});
		}
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
Clubs.schema = new SimpleSchema({
	name: {type: String},
	city: {type: String},
	owner: {type: String, optional: true},
	avatarURL: {type: String, optional: true},
	createdAt: {type: Date}
});
