import React, { Component } from 'react';
import { composeWithTracker } from 'react-komposer';
import { Clubs } from '../../../../imports/collection/clubs';
import { Activities } from '../../../../imports/collection/activities';
import { ClubUser } from '../../../../imports/collection/club_user';
import { ActivityUser } from '../../../../imports/collection/activity_user';
import NearbyIndex from './nearby_index';
import { userJoinClub, userQuitClub } from '../../../../imports/api/club_api';
import { userJoinActivity, userQuiteActivity } from '../../../../imports/api/activity_api';
const clubCallbacks = { userJoinClub, userQuitClub };
const activityCallbacks = { userJoinActivity, userQuiteActivity };

function composer(props, onData) {
	const userId = Meteor.userId();
	if (Meteor.subscribe('userClubs', userId).ready() && Meteor.subscribe("userActivities", userId).ready()) {
		//joined activities && clubs id
		const userClubs = ClubUser.find({userId}).fetch().map(clubUser => clubUser.clubId);
		const userActivities = ActivityUser.find({userId}).fetch().map(activityUser => activityUser.activityId);
		if (Meteor.subscribe("clubsNearby").ready() && Meteor.subscribe('activitiesNearby').ready()) {
			const clubs = Clubs.find({}).fetch();
			const activities = Activities.find({}, { sort: {'start_date': -1 }}).fetch();
			onData(null, { userId, clubs, activities, userClubs, userActivities, clubCallbacks, activityCallbacks });
		}
	}

}

export default composeWithTracker(composer)(NearbyIndex);
