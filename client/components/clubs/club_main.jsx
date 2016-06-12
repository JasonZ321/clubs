import React, { Component } from 'react';
import ClubDetail from './clubs_detail';
import { createContainer } from 'meteor/react-meteor-data';
import { Clubs } from '../../../imports/api/clubs';
import { browserHistory } from 'react-router';

class ClubMain extends Component {
	onLogout() {
		Meteor.logout(function(){
			console.log('Logged out');
			browserHistory.push('/');
		});
	}
	render() {
		return (
			<div>
				Clubs main page, not start yet!!!
				<a href='#' onClick={this.onLogout.bind(this)}>退出</a>
			</div>
		);
	}
}

export default ClubMain;
