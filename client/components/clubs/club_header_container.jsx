import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Clubs } from '../../../imports/api/clubs';
import ClubHeader from './club_header';
import {composeWithTracker} from 'react-komposer';

function onLogout() {
		Meteor.logout(function() {
			console.log('Logged out');
			browserHistory.push('/');
		});
}

function composer(props, onData) {
  if (Meteor.subscribe('currentClub').ready()) {
    const club = Clubs.findOne({owner: Meteor.userId()});
    onData(null, {club, onLogout});
  };
}

export default composeWithTracker(composer)(ClubHeader);
