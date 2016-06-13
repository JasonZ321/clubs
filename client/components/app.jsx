import React, { Component } from 'react';
import Header from './header';
import LoginRegisterPage from './login/login_register_page';
import ClubMain from './clubs/club_main';
import UserMain from './users/user_main';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Clubs } from '../../imports/api/clubs';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

class App extends TrackerReact(React.Component) {
	constructor(props) {
		super(props);
		this.state = {
			subscription: {
        currentClub: Meteor.subscribe('currentClub')
      }
		}
	}
	componentWillUnmount() {
		this.state.subscription.currentClub.stop();
	}
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
					const club = Clubs.findOne({'owner': currentUser._id});
					if (!club) {
						console.log(`user ${currentUser._id} doesn't have a club`);
						return;
					}
					const clubId = club._id;

					const url = `/club/${clubId}`;
					browserHistory.push(url);
				} else {
					browserHistory.push('/user_main');
				}
			}
	  });
	}
	// componentWillMount() {
	// 	if (!user) {
	// 		browserHistory.push('/login_register');
	// 	} else if(user.isClubUser) {
	// 		if (!club) {
	// 			console.log(`user ${currentUser._id} doesn't have a club`);
	// 			return;
	// 		}
	// 		const url = `/club/${club._id}`;
	// 		browserHistory.push(url);
	// 	} else {
	// 		browserHistory.push('/user_main');
	// 	}
	// }
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

export default App;

// export default composeWithTracker(composer)(TodoList);
