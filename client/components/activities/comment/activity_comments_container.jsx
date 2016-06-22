import { composeWithTracker } from 'react-komposer';
import { Comments } from '../../../../imports/collection/comments';
import ActivityComments from './activity_comments';

function composer(props, onData) {
	const activityId = props.activityId;
	if (Meteor.subscribe("activityComments", activityId).ready()) {
		const comments = Comments.find({activityId}, { sort: {'start_date': -1 }}).fetch();
		const authorizedToComment = Meteor.userId() != null;

		//TODO  clubs user can still comment on the activities that don't belong to them,
		// we should avoid this in the future.
		//TODO also, users didn't enroll the activity can still comment on it, we should avoid this too.
		onData(null, {comments, activityId, authorizedToComment});
	}
}

export default composeWithTracker(composer)(ActivityComments);
