import React, { Component } from 'react';
import ClubDetail from './clubs_detail';
import { createContainer } from 'meteor/react-meteor-data';
import { Clubs } from '../../../imports/api/clubs';
import { browserHistory } from 'react-router';
import ClubHeader from './club_header';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

class ClubApp extends Component {
	logout() {
		Meteor.logout(function() {
			console.log('Logged out');
			browserHistory.push('/login_register');
		});
	}
	render() {
		return (
			<div>
				<ClubHeader onLogout={this.logout}/>
					{this.props.children}
			</div>
		);
	}
}

export default ClubApp;
