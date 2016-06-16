import React, { Component } from 'react';
import {composeWithTracker} from 'react-komposer';
import { Clubs } from '../../../../imports/api/clubs';
import { Activities } from '../../../../imports/api/activities';
import { ClubUser } from '../../../../imports/api/club_user';
import { ActivityUser } from '../../../../imports/api/activity_user';
import NearbyIndex from './nearby_index';

function joinClub(clubId) {
	const userId = Meteor.userId();
	Meteor.call('club_user.insert', {clubId, userId}, function(error) {
		if (error) {
			console.error(error);
		} else {
			console.log("User '%s' joined Club '%s'", userId, clubId);
		}
	});
}

function unjoinClub(clubId) {
	const userId = Meteor.userId();
	Meteor.call('club_user.remove', {clubId, userId}, function(error) {
		if (error) {
			console.error(error);
		} else {
			console.log("User '%s' unjoined Club '%s' ", userId, clubId);
		}
	});
}

function joinActivity(activityId) {
	const userId = Meteor.userId();
	Meteor.call('activity_user.insert', {activityId, userId}, function(error) {
		if (error) {
			console.error(error);
		} else {
			console.log("User '%s' joined Activity '%s' ", userId, activityId);
		}
	});
}

function unjoinActivity(activityId) {
	const userId = Meteor.userId();
	Meteor.call('activity_user.remove', {activityId, userId}, function(error) {
		if (error) {
			console.error(error);
		} else {
			console.log("User '%s' unjoined Activity '%s' ", userId, activityId);
		}
	});
}

function composer(props, onData) {
	const userId = Meteor.userId();
	if (Meteor.subscribe('joinedClubs', userId).ready() && Meteor.subscribe("joinedActivities", userId).ready()) {
		//joined activities && clubs id
		const joinedClubs = ClubUser.find({userId}).fetch().map(clubUser => clubUser.clubId);
		const joinedActivities = ActivityUser.find({userId}).fetch().map(activityUser => activityUser.activityId);
		if (Meteor.subscribe("clubsNearby").ready() && Meteor.subscribe('activitiesNearby').ready()) {
			const clubs = Clubs.find({}).fetch();
			const activities = Activities.find({}, { sort: {'start_date': -1 }}).fetch();
			const clubCallbacks = {joinClub, unjoinClub};
			const activityCallbacks = {joinActivity, unjoinActivity};
			onData(null, { userId, clubs, activities, joinedClubs, joinedActivities, clubCallbacks, activityCallbacks });
		}
	}

}

export default composeWithTracker(composer)(NearbyIndex);
