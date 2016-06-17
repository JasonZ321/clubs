import React, { Component } from 'react';
import ActivityIndexCell from '../../clubs/activity/activity_index_cell';

const MyactivityIndex = ({activities, activityCallbacks}) => {
	return (
		<div className='col-md-6'>
			{
				activities.map((activity) => {
					return <ActivityIndexCell key={activity._id} callbacks={activityCallbacks} activity={activity} joined={true}/>;
				})
			}
		</div>
	)
};

export default MyactivityIndex;
