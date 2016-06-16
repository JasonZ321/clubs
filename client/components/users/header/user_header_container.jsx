import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import UserHeader from './user_header';
import {composeWithTracker} from 'react-komposer';

function onLogout() {
		Meteor.logout(function() {
			console.log('Logged out');
			browserHistory.push('/');
		});
}

function composer(props, onData) {
  if (Meteor.subscribe('currentUser').ready()) {
    const user = Meteor.user();
    onData(null, {user, onLogout});
  };
}

export default composeWithTracker(composer)(UserHeader);
