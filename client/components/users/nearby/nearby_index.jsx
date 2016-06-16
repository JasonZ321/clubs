import React, { Component } from 'react';
import ActivityIndexCell from '../../clubs/activity/activity_index_cell';
import ClubIndexCell from './club_index_cell';

class NearbyIndex extends Component {
	renderClubList() {
		return this.props.clubs.map(club => <ClubIndexCell key={club._id} club={club} />);
	}
	renderActivityList() {
		return this.props.activities.map(activity => <ActivityIndexCell key={activity._id} activity={activity}/>);
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
