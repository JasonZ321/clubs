import React from 'react';
import { Clubs } from '../../../../imports/api/clubs';
import { Activities } from '../../../../imports/api/activities';
import { composeWithTracker } from 'react-komposer';
import ActivityIndex from './activity_index';

function getClubIdByURL(url) {
	let str = url.substr(url.lastIndexOf("/club/")+6);
	if (str.indexOf('/') < 0) {
		return str;
	} else {
		return str.substr(0, str.indexOf('/'));
	}
}

function composer(props, onData) {
	const url = props.location.pathname;
	const clubId = getClubIdByURL(url);
	if (Meteor.subscribe("activities", clubId).ready()) {
		const activities = Activities.find({'clubId': clubId}, { sort: {'start_date': -1 }}).fetch();
		onData(null, {activities});
	}
}


export default composeWithTracker(composer)(ActivityIndex);
