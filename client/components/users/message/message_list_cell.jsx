import React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import { browserHistory } from 'react-router';
import { removeChat } from '../../../../imports/api/user_api';

function navigateToChat(senderId, receiverId) {
	const url = `/user/${senderId}/messages/${receiverId}`;
	browserHistory.push(url);
}

const MessageListCell = ({senderId, receiver, lastMesssage}) => {
	const primaryText = `与${receiver.profile.name}的聊天`;
	return (
		<div key={receiver._id}>
			<ListItem
				primaryText={primaryText} secondaryText={<p>{lastMesssage.date.toTimeString()} <br/> {lastMesssage.content}</p>} secondaryTextLines={2}
				leftAvatar={<Avatar onClick={() => {navigateToChat(senderId, receiver._id)}} src={receiver.profile.avatarURL} />}
				rightIconButton={	<FlatButton secondary={true} label="删除聊天记录" onClick={()=>{removeChat(receiver._id)}}/>} />
			<Divider />
		</div>
	);
}

export default MessageListCell;
