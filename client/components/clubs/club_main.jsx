import React, { Component } from 'react';
import ClubDetail from './clubs_detail';
import { createContainer } from 'meteor/react-meteor-data';
import { Clubs } from '../../../imports/api/clubs';
import { browserHistory } from 'react-router';
import ClubHeader from './club_header';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

class ClubMain extends Component {
	render() {
		return (
			<div>
				main page
			</div>
		);
	}
}

export default ClubMain;
