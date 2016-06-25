import React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { browserHistory } from 'react-router';

function navigateToChat(senderId, receiverId) {
	const url = `/user/${senderId}/messages/${receiverId}`;
	browserHistory.push(url);
}

const MessageListCell = ({receiver, lastMesssage}) => {
	return (
		<ListItem key={receiver._id}
			primaryText={receiver.profile.name} secondaryText={lastMesssage} leftAvatar={<Avatar onClick={() => {this.navigateToChat(senderId, receiver._id)}} src={receiver.profile.avatarURL} />} />
	);
}

export default MessageListCell;
