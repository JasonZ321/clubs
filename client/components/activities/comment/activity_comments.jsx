import React, { Component } from 'react';
import ActivityCommentEditor from './activity_comment_editor';
import ActivityCommentList from './activity_comment_list';
class ActivityComments extends Component {
	render() {
		return (
			<div>
	  		{
					this.props.authorizedToComment ? <ActivityCommentEditor authorizedToComment={this.props.authorizedToComment} activityId={this.props.activityId}/> : <div></div>
				}
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
