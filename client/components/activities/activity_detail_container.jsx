import { composeWithTracker } from 'react-komposer';
import { Activities } from '../../../imports/collection/activities';
import { Clubs } from '../../../imports/collection/clubs';
import { getIdByURL } from '../../../imports/util/common_util';
import ActivityDetail from './activity_detail';

function composer(props, onData) {
	const url = props.location.pathname;
	const activityIdFromURL = getIdByURL(url, "/activity/");
	if (Meteor.subscribe("activity", activityIdFromURL).ready()) {
		debugger;
		const activity = Activities.findOne({})
		if (activity && Meteor.subscribe("club", activity.clubId).ready()) {
			const club = Clubs.findOne({});
			onData(null, {activity}, {club});
		}
	}
}

export default composeWithTracker(composer)(ActivityDetail);
