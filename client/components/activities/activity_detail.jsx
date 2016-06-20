import React, { Component } from 'react';
import ActivityBrief from './activity_brief';
import ActivityGalleryContainer from './activity_gallery_container';
import ActivityCommentsContainer from './activity_comments_container';

class ActivityDetail extends Component {
	render() {
		const activity = this.props.activity;
		return (
			<div>
				<ActivityBrief activity={activity} />
				<ActivityGalleryContainer activityId={activity._id} />
				<ActivityCommentsContainer activityId={activity} />
	  	</div>
		);
	}
}

export default ActivityDetail;
