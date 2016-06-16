import React, { Component } from 'react';
import LoginRegisterPage from './login/login_register_page';
import ClubMain from './clubs/club_main';
import UserMain from './users/user_main';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Clubs } from '../../imports/api/clubs';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {composeWithTracker} from 'react-komposer';

class App extends TrackerReact(Component) {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const userId = Meteor.userId();
		if (!userId) {
			browserHistory.push('/login_register');
		}

		Meteor.subscribe('currentUser', function() {
			console.log(Meteor.user());
			const currentUser = Meteor.user();
			if (!currentUser) {
				console.log("User not loaded");
				return;
			}
			if (currentUser && currentUser.isClubUser) {
				Meteor.subscribe('currentClub', function() {
					const club = Clubs.findOne({'owner': currentUser._id});
					if (!club) {
						console.log(`user ${currentUser._id} doesn't have a club`);
						return;
					}
					const clubId = club._id;
					const url = `/club/${clubId}`;
					browserHistory.push(url);
				});
			} else {
				browserHistory.push('/user_main');
			}
	  });
	}
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

export default App;
