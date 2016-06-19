import React from 'react'
import { browserHistory } from 'react-router';
import { Clubs } from '../../../imports/collection/clubs';
import ClubApp from './club_app';
import { composeWithTracker } from 'react-komposer';

function getClubIdByURL(url) {
	let str = url.substr(url.lastIndexOf("/club/")+6);
	if (str.indexOf('/') < 0) {
		return str;
	} else {
		return str.substr(0, str.indexOf('/'));
	}
}

function composer(props, onData) {
  if (Meteor.subscribe('currentClub').ready()) {
    var club = Clubs.findOne({owner: Meteor.userId()});
		debugger;
		if (club) {
			onData(null, {club}, {'authorized': true});
		} else {
			const url = props.location.pathname;
			const clubId = getClubIdByURL(url);
			if (Meteor.subscribe("club", clubId).ready()) {
				club = Clubs.findOne({'_id': clubId});
				debugger;
				onData(null, {club}, {'authorized': true});
			}
		}
  };
}

export default composeWithTracker(composer)(ClubApp);
