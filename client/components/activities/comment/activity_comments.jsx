import React, { Component } from 'react';
import ActivityCommentEditor from './activity_comment_editor';
import ActivityCommentList from './activity_comment_list';
class ActivityComments extends Component {
	render() {
		return (
			<div>
	  		<ActivityCommentEditor activityId={this.props.activityId}/>
				{
					this.props.comments && this.props.comments.length > 0 ?
					<ActivityCommentList activityId={this.props.activityId} comments={this.props.comments} />
					: <div></div>
				}
		</div>
		)
	}
}

export default ActivityComments;
