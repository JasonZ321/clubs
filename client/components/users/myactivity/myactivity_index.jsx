import React, { Component } from 'react';
import ActivityIndexCellContainer from '../../clubs/activity/activity_index_cell_container';

class MyactivityIndex extends Component {
	renderActivities() {
		const authorized = this.context.authorized;
		const activityCallbacks = this.props.activityCallbacks;
		return this.props.activities.map((activity) => {
			return <ActivityIndexCellContainer key={activity._id} callbacks={activityCallbacks} activity={activity} joined={true} authorized={authorized}/>;
		});
	}
	render() {
		return (
			<div className='col-md-6'>
				<ul>{this.renderActivities()}</ul>
			</div>
		);
	}
};

MyactivityIndex.contextTypes = {
	authorized: React.PropTypes.bool
}

export default MyactivityIndex;
