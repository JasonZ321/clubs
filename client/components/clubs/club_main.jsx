import React, { Component } from 'react';
import ClubDetail from './clubs_detail';
import { createContainer } from 'meteor/react-meteor-data';
import { Clubs } from '../../../imports/api/clubs';
import { browserHistory } from 'react-router';
import ClubHeader from './club_header';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

class ClubMain extends Component {
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
		const club = Clubs.findOne({owner:userId});
		this.setState({
			subscription: {
				currentClub: club
			}
		});
	}
	render() {
		return (
			<div>
				<ClubHeader club={this.state.subscription.currentClub} />
					Clubs main page, not start yet!!!
			</div>
		);
	}
}

export default ClubMain;
