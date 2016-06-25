import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import MessageChatEditor from './message_chat_editor';

class MessageChat extends Component {
	renderMessages() {
		const {sender, receiver, messages} = this.props;
		return messages.map((message) => {
		 	if (message.sender === sender._id) {
				return (
					<div key={message.date.toString()}>
						<ListItem
							primaryText={sender.profile.name} secondaryText={message.content} leftAvatar={<Avatar src={sender.profile.avatarURL} />} />
	    		</div>
				)
			} else {
				return (
					<div key={message.date.toString()}>
						<ListItem
							primaryText={receiver.profile.name} secondaryText={message.content} leftAvatar={<Avatar src={receiver.profile.avatarURL} />} />
	    		</div>
				)
			}
		});
	}
	render() {
			return (
				<div className='col-md-6'>
					<List>
						<Subheader>聊天</Subheader>
						{this.renderMessages()}
					</List>
					<MessageChatEditor receiverId={this.props.receiver._id} />
				</div>
			)
	}
}

export default MessageChat;
