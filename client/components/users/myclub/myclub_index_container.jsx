import React, { Component } from 'react';
import { composeWithTracker } from 'react-komposer';
import { clubCallbacks } from '../utils/join';
import { Clubs } from '../../../../imports/api/clubs';
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
		onData(null, { userId, clubs, clubCallbacks });
	}
}

export default composeWithTracker(composer)(MyclubIndex);
