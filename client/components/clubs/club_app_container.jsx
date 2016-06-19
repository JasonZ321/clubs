import React from 'react'
import { browserHistory } from 'react-router';
import { Clubs } from '../../../imports/collection/clubs';
import ClubApp from './club_app';
import { composeWithTracker } from 'react-komposer';
import { getIdByURL } from '../../../imports/util/common_util';

function composer(props, onData) {
  if (Meteor.subscribe('currentClub').ready()) {
    var club = Clubs.findOne({owner: Meteor.userId()});
    const url = props.location.pathname;
    const clubIdFromURL = getIdByURL(url, "/club/");

		if (club && club._id === clubIdFromURL) {
			onData(null, {club, 'authorized': true});
		} else {
			if (Meteor.subscribe("club", clubIdFromURL).ready()) {
				club = Clubs.findOne({'_id': clubIdFromURL});
				onData(null, {club, 'authorized': false});
			}
		}
  };
}

export default composeWithTracker(composer)(ClubApp);
