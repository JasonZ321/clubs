import React, { Component } from 'react';
import {composeWithTracker} from 'react-komposer';
import { Clubs } from '../../../../imports/api/clubs';
import { Activities } from '../../../../imports/api/activities';
import NearbyIndex from './nearby_index';

function composer(props, onData) {
	if (Meteor.subscribe("clubsNearby").ready() && Meteor.subscribe('activitiesNearby').ready()) {
		const userId = Meteor.userId();
		const clubs = Clubs.find({}).fetch();
		const activities = Activities.find({}, { sort: {'start_date': -1 }}).fetch();
		onData(null, {userId, clubs, activities});
	}
}

export default composeWithTracker(composer)(NearbyIndex);
