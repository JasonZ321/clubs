import React, { Component } from 'react';
import { composeWithTracker } from 'react-komposer';
import { userJoinActivity, userQuiteActivity } from '../../../../imports/api/activity_api';
import { Activities } from '../../../../imports/collection/activities';
import MyactivityIndex from './myactivity_index';
import { getIdByURL } from '../../../../imports/util/common_util';

function composer(props, onData) {
	const url = props.location.pathname;
	const userId = getIdByURL(url, "/user/");
	if (Meteor.subscribe('joinedActivities', userId).ready()) {
		const activities = Activities.find({}, { sort: {'start_date': -1 }}).fetch();
		onData(null, { userId, activities, activityCallbacks: {userJoinActivity, userQuiteActivity} });
	}
}

export default composeWithTracker(composer)(MyactivityIndex);
