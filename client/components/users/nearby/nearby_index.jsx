import React, { Component } from 'react';
import ActivityIndexCell from '../../clubs/activity/activity_index_cell';
import ClubIndexCell from './club_index_cell';

class NearbyIndex extends Component {
	renderClubList() {
		let props = this.props;
		return props.clubs.map((club) => {
			debugger;
			return <ClubIndexCell key={club._id} callbacks={props.clubCallbacks} club={club} joined={props.joinedClubs.indexOf(club._id) >= 0}/>;
		});
	}

	renderActivityList() {
		let props = this.props;
		return props.activities.map((activity) => {
			return <ActivityIndexCell key={activity._id} activity={activity}/>;
		});
	}
	render() {
		return (
			<div className='col-md-6'>
				<div>
					<h1 className='text-center'>附近的社团</h1>
					<ul>
						{this.renderClubList()}
					</ul>
				</div>
				<div>
					<h1 className='text-center'>附近的活动</h1>
					<ul>
						{this.renderActivityList()}
					</ul>
				</div>
			</div>
		);
	}
}

export default NearbyIndex;
