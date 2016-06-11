import React, { Component } from 'react';
import ClubDetail from './clubs_detail';
import { createContainer } from 'meteor/react-meteor-data';
import { Clubs } from '../../../imports/api/clubs';

class ClubsMain extends Component {
	removeClub(club) {
		Meteor.call('clubs.remove', club);
	}
	render() {
		return (
			<div>
				<span><h1 className="text-center">List of Clubs</h1></span>
				<div className="employee-list">
					{this.props.clubs.map(club =>
						<ClubDetail key={club._id} club={club} onClubRemove={()=> this.removeClub(club)}/>
					)}
			</div>
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('clubs');

	return { clubs: Clubs.find({}).fetch() };

}, ClubsMain);
