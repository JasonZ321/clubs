import React, { Component } from 'react';
import {ListItem, List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { browserHistory } from 'react-router';
import { removeFriend } from '../../../../imports/api/user_api';

class FriendList extends Component {
	navigateToUser(friend) {
		const url = `/user/${friend._id}`;
		browserHistory.push(url);
	}
	renderFriendCell(friend) {
		if (this.context.authorized) {
			return (<ListItem key={friend._id}
				primaryText={friend.profile.name} leftAvatar={<Avatar onClick={() => {this.navigateToUser(friend)}} src={friend.profile.avatarURL} />}
				rightIconButton={	<FlatButton secondary={true} label="移除好友" onClick={()=>{removeFriend(friend._id)}}/>} />);
		}
		return (<ListItem key={friend._id}
			primaryText={friend.profile.name} leftAvatar={<Avatar onClick={() => {this.navigateToUser(friend)}} src={friend.profile.avatarURL} />} />);
	}
	renderList(friends) {
		if (!friends) {
			return <div>你暂无好友</div>;
		}
		return friends.map(friend => this.renderFriendCell(friend) );
	}

	render() {
		return (
			<div className='col-md-6'>
				<List>
					<Subheader>好友</Subheader>
					{this.renderList(this.props.friends)}
				</List>
			</div>
		);
	}

}

FriendList.contextTypes = {
	authorized: React.PropTypes.bool
}

export default FriendList;
