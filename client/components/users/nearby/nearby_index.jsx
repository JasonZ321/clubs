import React, { Component } from 'react';
import ActivityIndexCell from '../../clubs/activity/activity_index_cell';
import ClubIndexCell from './club_index_cell';

class NearbyIndex extends Component {
	renderClubList() {
		const props = this.props;
		const authorized = this.context.authorized;
		return props.clubs.map((club) => {
			return <ClubIndexCell key={club._id} callbacks={props.clubCallbacks} club={club} authorized={authorized} joined={props.userClubs.indexOf(club._id) >= 0}/>;
		});
	}

	renderActivityList() {
		const props = this.props;
		const authorized = this.context.authorized;
		return props.activities.map((activity) => {
			return <ActivityIndexCell key={activity._id} callbacks={props.activityCallbacks} activity={activity} authorized={authorized} joined={props.userActivities.indexOf(activity._id) >= 0}/>;
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

NearbyIndex.contextTypes = {
	authorized: React.PropTypes.bool
}

export default NearbyIndex;
