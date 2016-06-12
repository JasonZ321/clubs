import React, { Component } from 'react';
import Header from './header';
import LoginRegisterPage from './login/login_register_page';
import ClubMain from './clubs/club_main';
import UserMain from './users/user_main';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
class App extends Component {
	componentWillMount() {
		const userId = Meteor.userId();
		if (!userId) {
			browserHistory.push('/login_register');
		}

		Meteor.subscribe('currentUser', function() {
			console.log(Meteor.user());
			const currentUser = Meteor.user();
			if (currentUser) {
				if (currentUser.isClubUser) {
					browserHistory.push('/club_main');
				} else {
					browserHistory.push('/user_main');
				}
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
