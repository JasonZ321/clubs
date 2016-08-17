import React from 'react';
import { composeWithTracker } from 'react-komposer';
import ActivityCommentCell from './activity_comment_cell';
import { Clubs } from '../../../../imports/collection/clubs';

function composer(props, onData) {
	const userId = props.comment.userId;
	if (Meteor.subscribe("user", userId).ready()) {
		const user =	Meteor.users.findOne({_id: userId});
		if (user && user.isClubUser) {
			if (Meteor.subscribe("clubByOwner", userId).ready()) {
				const club = Clubs.findOne({'owner': userId});
				onData(null, {comment: props.comment, user, club})
			}
		} else {
			onData(null, {comment: props.comment, user});
		}
	}
}

export default composeWithTracker(composer)(ActivityCommentCell);
