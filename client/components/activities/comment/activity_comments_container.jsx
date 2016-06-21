import { composeWithTracker } from 'react-komposer';
import { Comments } from '../../../../imports/collection/comments';
import ActivityComments from './activity_comments';

function composer(props, onData) {
	const activityId = props.activityId;
	if (Meteor.subscribe("activityComments", activityId).ready()) {
		const comments = Comments.find({activityId}, { sort: {'start_date': -1 }}).fetch();
		onData(null, {comments, activityId});
	}
}

export default composeWithTracker(composer)(ActivityComments);
