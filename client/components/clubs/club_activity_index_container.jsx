import React from 'react';
import { Clubs } from '../../../imports/api/clubs';
import { Activities } from '../../../imports/api/activities';
import { composeWithTracker } from 'react-komposer';
import ClubActivityIndex from './club_activity_index';


function composer(props, onData) {
	if (Meteor.subscribe('currentClub').ready()) {
		const club = Clubs.findOne({owner: Meteor.userId()});
		if (club && Meteor.subscribe("activities", club._id).ready()) {
			const activities = Activities.find({'clubId': club._id}, { sort: {'start_date': -1 }}).fetch();
			onData(null, {activities});
		} else if(!club) {
			console.error('error! current club not found');
		}
	}
}

export default composeWithTracker(composer)(ClubActivityIndex);
