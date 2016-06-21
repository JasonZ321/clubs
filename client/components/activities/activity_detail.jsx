import React, { Component } from 'react';
import ActivityBrief from './activity_brief';
import ActivityGalleryContainer from './gallery/activity_gallery_container';
import ActivityCommentsContainer from './comment/activity_comments_container';

class ActivityDetail extends Component {
	render() {
		const activity = this.props.activity;
		return (
			<div className='col-md-6'>
				<ActivityBrief activity={activity} />
				<ActivityGalleryContainer activityId={activity._id} />
				<ActivityCommentsContainer activityId={activity} />
	  	</div>
		);
	}
}

export default ActivityDetail;
