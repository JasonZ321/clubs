import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

class ActivityCommentCell extends Component {
	renderCommentContent(comment) {
		return <p>{comment.content}</p>
	}
	render() {
		const comment = this.props.comment;
		const user = this.props.user;
		const club = this.props.club;
		if (user.isClubUser && club) {
			return (
				<div>
					<ListItem
		          leftAvatar={<Avatar src={club.avatarURL} />}
		          primaryText={club.name}
		          secondaryText={
		            this.renderCommentContent(comment)
		          }
		          secondaryTextLines={2}
		        />
		        <Divider inset={true} />
	   	</div>
			);
		} else {
			return (
				<div>
					<ListItem
		          leftAvatar={<Avatar src={user.profile.avatarURL} />}
		          primaryText={user.profile.name}
		          secondaryText={
		            this.renderCommentContent(comment)
		          }
		          secondaryTextLines={2}
		        />
		        <Divider inset={true} />
	   	</div>
			);
		}
	}
}

export default ActivityCommentCell;
