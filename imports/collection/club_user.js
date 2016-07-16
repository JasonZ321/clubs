import { Mongo } from 'meteor/mongo';

Meteor.methods({
	'club_user.insert': function({clubId, userId}) {
		const data = {
			createdAt: new Date(),
			clubId,
			userId
		};
		ClubUser.schema.validate(data);
		return ClubUser.insert(data);
	},
	'club_user.remove': function({clubId, userId}) {
		ClubUser.remove({clubId, userId});
	}
});

export const ClubUser = new Mongo.Collection('club_user');

ClubUser.schema = new SimpleSchema({
	createdAt: {type: Date},
	userId: {type: String},
	clubId: {type: String}
});
