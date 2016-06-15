import React from 'react';
import {composeWithTracker} from 'react-komposer';
import { Clubs } from '../../../imports/api/clubs';
import ClubSidePanel from './club_sidepanel';
function composer(props, onData) {
	if (Meteor.subscribe('currentClub').ready()) {
		const club = Clubs.findOne({owner: Meteor.userId()});
		onData(null, {club});
	};
}

export default composeWithTracker(composer)(ClubSidePanel);
