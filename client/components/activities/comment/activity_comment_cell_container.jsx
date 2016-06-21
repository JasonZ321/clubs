import React from 'react';
import { composeWithTracker } from 'react-komposer';
import ActivityCommentCell from './activity_comment_cell';

function composer(props, onData) {
	const userId = props.comment.userId;
	if (Meteor.subscribe("user", userId).ready()) {
		const user =	Meteor.users.findOne({_id: userId});
		onData(null, {comment: props.comment, user});
	}
}

export default composeWithTracker(composer)(ActivityCommentCell);
