import React from 'react'
import { browserHistory } from 'react-router';
import UserApp from './user_app';
import { composeWithTracker } from 'react-komposer';
import { getIdByURL } from '../../../imports/util/common_util';

function composer(props, onData) {
	if (Meteor.subscribe("currentUser").ready()) {
		const currentUser = Meteor.user();
		const url = props.location.pathname;
		const userIdFromURL = getIdByURL(url, "/user/");

		if (currentUser && userIdFromURL === currentUser._id) {
			onData(null, {'user': currentUser, 'authorized': true});
		} else {
			if (Meteor.subscribe("user", userIdFromURL).ready()) {
				const user = Meteor.users.findOne({'_id': userIdFromURL});

				onData(null, {user, 'authorized': false});
			}
		}
	}

}

export default composeWithTracker(composer)(UserApp);
