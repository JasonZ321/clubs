import { composeWithTracker } from 'react-komposer';
import ActivityUserList from './activity_user_list';
import {ActivityUser} from '../../../../imports/collection/activity_user';
function composer(props, onData) {
	const activityId = props.activityId;
	if (Meteor.subscribe("activityMembers", activityId).ready()) {
		const userIds = ActivityUser.find({activityId}, { 'sort': {'createdAt': 1 }}).fetch().map(activityUser => activityUser.userId);
		// I didn't fetch users directly from server because it will always return the user current logged in.
		if (Meteor.subscribe("users", userIds).ready()) {
			const users = Meteor.users.find({_id : { $in : userIds }}).fetch();
			onData(null, {users});
		}
	}
}

export default composeWithTracker(composer)(ActivityUserList);
