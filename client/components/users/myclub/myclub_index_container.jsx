import React, { Component } from 'react';
import { composeWithTracker } from 'react-komposer';
import { userJoinClub, userQuitClub } from '../../../../imports/api/club_api';
import { Clubs } from '../../../../imports/collection/clubs';
import MyclubIndex from './myclub_index';

function getUserIdByURL(url) {
	var str = url.substr(url.lastIndexOf("/user/")+6);
	if (str.indexOf('/') < 0) {
		return str;
	} else {
		return str.substr(0, str.indexOf('/'));
	}
}

function composer(props, onData) {
	const url = props.location.pathname;
	const userId = getUserIdByURL(url);
	if (Meteor.subscribe('joinedClubs', userId).ready()) {
		const clubs = Clubs.find({}, { sort: {'start_date': -1 }}).fetch();
		onData(null, { userId, clubs, clubCallbacks: {userJoinClub, userQuitClub} });
	}
}

export default composeWithTracker(composer)(MyclubIndex);
