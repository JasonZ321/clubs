import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import MessageListCellContainer from './message_list_cell_container';

class MessageList extends Component {
	renderList(chats) {
		if (!chats) {
			return <div>你暂无消息</div>;
		}
		debugger;
		return chats.map(chat => 	<MessageListCellContainer chat={chat} /> );
	}
	render() {
		return (
			<div className='col-md-6'>
				<List>
					<Subheader>消息</Subheader>
					{this.context.authorized ? this.renderList(this.props.chats) : <div>Not authorized</div>}
				</List>
			</div>
		);
	}
}

MessageList.contextTypes = {
	authorized: React.PropTypes.bool
}

export default MessageList;
