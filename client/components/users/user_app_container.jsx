import React from 'react'
import { browserHistory } from 'react-router';
import UserApp from './user_app';
import { composeWithTracker } from 'react-komposer';
import { getIdByURL } from '../../../imports/util/common_util';
import { Friends } from '../../../imports/collection/friends';

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
				if (currentUser.isClubUser) {
					onData(null, {user, 'authorized': false});
				} else {
					if (Meteor.subscribe("friends", currentUser._id).ready()) {
						const myFriends = Friends.findOne({self: currentUser._id});
						if (myFriends && myFriends.friends && myFriends.friends.indexOf(userIdFromURL) >= 0) {
							onData(null, {user, 'authorized': false, relationship: 'friend'});
						} else {
							onData(null, {user, 'authorized': false, relationship: 'stranger'});
						}
					}
				}
			}
		}
	}
}

export default composeWithTracker(composer)(UserApp);
