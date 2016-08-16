import React from 'react';
import { composeWithTracker } from 'react-komposer';
import ActivityIndexCell from './activity_index_cell';
import { Clubs } from '../../../../imports/collection/clubs';

function composer(props, onData) {
	const clubId = props.activity.clubId;
	const {activity, callbacks, joined, authorized} = props;
	if (Meteor.subscribe("club", clubId).ready()) {
		const club = Clubs.findOne({_id: clubId});
		onData(null, {club, activity, callbacks, joined, authorized});
	}
}

export default composeWithTracker(composer)(ActivityIndexCell);
