import React, { Component } from 'react';
import { composeWithTracker } from 'react-komposer';
import { Clubs } from '../../../../imports/api/clubs';
import { Activities } from '../../../../imports/api/activities';
import { ClubUser } from '../../../../imports/api/club_user';
import { ActivityUser } from '../../../../imports/api/activity_user';
import NearbyIndex from './nearby_index';
import { clubCallbacks, activityCallbacks } from '../utils/join';

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
