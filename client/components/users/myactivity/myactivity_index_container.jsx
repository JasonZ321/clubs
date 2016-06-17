import React, { Component } from 'react';
import { composeWithTracker } from 'react-komposer';
import { activityCallbacks } from '../utils/join';
import { Activities } from '../../../../imports/api/activities';
import MyactivityIndex from './myactivity_index';

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
	if (Meteor.subscribe('joinedActivities', userId).ready()) {
		const activities = Activities.find({}, { sort: {'start_date': -1 }}).fetch();
		onData(null, { userId, activities, activityCallbacks });
	}
}

export default composeWithTracker(composer)(MyactivityIndex);
