import React from 'react';
import {composeWithTracker} from 'react-komposer';
import UserSidePanel from './user_sidepanel';
function composer(props, onData) {
	if (Meteor.subscribe('currentUser').ready()) {
		const user = Meteor.user();
		onData(null, {user});
	};
}

export default composeWithTracker(composer)(UserSidePanel);
