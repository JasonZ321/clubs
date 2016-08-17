import React from 'react';
import { Activities } from '../../../../imports/collection/activities';
import { composeWithTracker } from 'react-komposer';
import ActivityIndex from './activity_index';
import { getIdByURL } from '../../../../imports/util/common_util';


function composer(props, onData) {
	const url = props.location.pathname;
	const clubId = getIdByURL(url, "/club/");
	if (Meteor.subscribe("activities", clubId).ready()) {
		const activities = Activities.find({'clubId': clubId}, { sort: {'start_date': -1 }}).fetch();
		onData(null, {activities});
	}
}


export default composeWithTracker(composer)(ActivityIndex);
